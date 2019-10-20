const crypto = require('crypto');

const axios = require('axios');
const promisify = require('es6-promisify');
const _ = require('lodash');
const moment = require('moment');
const { Cookie } = require('tough-cookie');
const callbackParseString = require('xml2js').parseString;

const BASE_URL = 'https://gpodder.net';
const parseString = promisify(callbackParseString);

async function setupClient(auth) {
  const client = axios.create({ baseURL: BASE_URL });
  const authResp = await client.post(
    `api/2/auth/${auth.username}/login.json`,
    {},
    { auth },
  );
  const respCookie = authResp.headers['set-cookie'];
  const cookieStr = (
    respCookie instanceof Array ? respCookie : [respCookie]
  ).map(str => Cookie.parse(str).cookieString()).join(';');

  client.defaults.headers.cookie = cookieStr;
  return client;
}


async function recentActivity(client, username) {
  const weekAgo = moment().subtract(7, 'days').unix();
  const { data: { actions } } = await client.get(
    `api/2/episodes/${username}.json`,
    { params: { since: weekAgo } },
  );
  const filteredActions = actions.filter(a => a.action === 'play');
  const byPodcast = {};
  filteredActions.forEach(({ episode, podcast, timestamp }) => {
    const actionDate = moment(timestamp).unix();
    byPodcast[podcast] = byPodcast[podcast] || {};
    const existingAction = byPodcast[podcast][episode] || 0;
    byPodcast[podcast][episode] = Math.max(actionDate, existingAction);
  });
  return byPodcast;
}

async function readRSS(url) {
  const { data } = await axios.get(url);
  const { rss } = await parseString(data);
  const rawChannel = rss.channel[0];
  const episodes = {};

  rawChannel.item
    .filter(item => item.enclosure)
    .forEach((item) => {
      episodes[item.enclosure[0].$.url] = {
        description: (
          (item.description && item.description[0])
          || (item['itunes:summary'] && item['itunes:summary'][0])
        ),
        pubDate: moment(item.pubDate[0]).unix(),
        title: item.title[0],
        url: item.enclosure[0].$.url,
      };
    });

  return {
    episodes,
    description: rawChannel.description && rawChannel.description[0].trim(),
    imageUrl: (
      (rawChannel.image && rawChannel.image[0].url[0])
      || (rawChannel['itunes:image'] && rawChannel['itunes:image'][0].$.href)
    ),
    link: rawChannel.link && rawChannel.link[0],
    title: rawChannel.title && rawChannel.title[0],
  };
}


function hash(str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
}


exports.sourceNodes = async ({ actions, createNodeId }, { auth }) => {
  const { createNode } = actions;
  const client = await setupClient(auth);

  const allResp = await client.get(`subscriptions/${auth.username}.json`);
  const allRecent = await recentActivity(client, auth.username);
  await Promise.all(allResp.data.map(async (subscription) => {
    // Use a try-catch to allow some podcasts to error
    try {
      const channel = await readRSS(subscription.url);
      const listenedTo = [];
      Object.entries(allRecent[subscription.url] || {}).forEach(([episode, timestamp]) => {
        const channelEpisode = channel.episodes[episode] || {};
        listenedTo.push({ timestamp, title: channelEpisode.title });
      });
      const recentTitles = _.sortBy(listenedTo, ep => -1 * ep.timestamp)
        .map(ep => ep.title)
        .filter(t => t);

      const description = subscription.description || channel.description;

      const fields = {
        recentTitles,
        description,
        logoUrl: subscription.logo_url || channel.imageUrl,
        maxActivity: _.max(listenedTo.map(ep => ep.timestamp)) || 0,
        maxEpisode: _.max(Object.values(channel.episodes).map(i => i.pubDate)) || 0,
        title: subscription.title || channel.title,
        website: subscription.website || channel.link,
      };

      createNode({
        ...fields,
        id: createNodeId(`Podcast:${subscription.url}`),
        internal: {
          contentDigest: hash(JSON.stringify(fields)),
          type: 'Podcast',
        },
        parent: null,
      });
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }));
};

function generateMarkdownDescription(node, { createNode, createNodeField }) {
  if (!node.description) {
    return;
  }

  const descNodeId = `${node.id}-MarkdownDescription`;
  createNode({
    id: descNodeId,
    parent: node.id,
    internal: {
      content: node.description,
      contentDigest: hash(node.description),
      type: 'PodcastMarkdownDescription',
      mediaType: 'text/markdown',
    },
  });
  createNodeField({
    node,
    name: 'description___NODE',
    value: descNodeId,
  });
}

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.owner === 'gatsby-source-gpodder') {
    generateMarkdownDescription(node, actions);
  }
};
