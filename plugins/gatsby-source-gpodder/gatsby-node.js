const crypto = require('crypto');

const axios = require('axios');
const promisify = require('es6-promisify');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const _ = require('lodash');
const moment = require('moment');
const normalizeUrl = require('normalize-url');
const { Cookie } = require('tough-cookie');
const callbackParseString = require('xml2js').parseString;

const BASE_URL = 'https://gpodder.net';
const HTTP_TIMEOUT = 60 * 1000;
const parseString = promisify(callbackParseString);

function normalizeEpisode(asStr) {
  return normalizeUrl(
    asStr,
    { removeQueryParameters: [/.+/] },
  );
}


async function setupClient(auth) {
  const client = axios.create({ baseURL: BASE_URL, timeout: HTTP_TIMEOUT });
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
    const normEpisode = normalizeEpisode(episode);
    const actionDate = moment(timestamp).unix();
    byPodcast[podcast] = byPodcast[podcast] || {};
    const existingAction = byPodcast[podcast][normEpisode] || 0;
    byPodcast[podcast][normEpisode] = Math.max(actionDate, existingAction);
  });
  return byPodcast;
}

async function readRSS(url) {
  const { data } = await axios.get(url, { timeout: HTTP_TIMEOUT });
  const { rss } = await parseString(data);
  const rawChannel = rss.channel[0];
  const episodes = {};

  rawChannel.item
    .filter(item => item.enclosure)
    .forEach((item) => {
      const normEpisode = normalizeEpisode(item.enclosure[0].$.url);
      episodes[normEpisode] = {
        description: (
          (item.description && item.description[0])
          || (item['itunes:summary'] && item['itunes:summary'][0])
        ),
        imageUrl: (
          (item['itunes:image'] && item['itunes:image'][0].$.href)
          || (item['media:thumbnail'] && item['media:thumbnail'][0].$.url)
        ),
        pubDate: moment(item.pubDate[0]).unix(),
        title: item.title[0],
        url: normEpisode,
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

async function createEpisodes(actions, createNodeId, podcastId, podcastLogo, listenedTo) {
  const { createNode } = actions;
  for (const episode of listenedTo) { // eslint-disable-line no-restricted-syntax
    /* eslint-disable no-await-in-loop */
    if (episode.logoUrl === podcastLogo) {
      delete episode.logoUrl;
    }
    await createNode({
      ...episode,
      id: createNodeId(`PodcastEpisode:${episode.url}`),
      internal: {
        contentDigest: hash(JSON.stringify(episode)),
        type: 'PodcastEpisode',
      },
      parent: null,
    });
    /* eslint-enable no-await-in-loop */
  }
}


exports.sourceNodes = async ({ actions, createNodeId, reporter }, { auth }) => {
  const { createNode } = actions;
  const client = await setupClient(auth);

  const allResp = await client.get(`subscriptions/${auth.username}.json`);
  const allRecent = await recentActivity(client, auth.username);
  const pbar = reporter.createProgress('Podcasts', allResp.data.length);
  pbar.start();

  // We allow for-of as we need to await within the loop. This is all
  // happening render side, so performance isn't paramount.
  for (const subscription of allResp.data) { // eslint-disable-line no-restricted-syntax
    pbar.tick();
    // We want to do the inefficient thing and process these subscriptions one
    // by one as each can be a lot of work.
    /* eslint-disable no-await-in-loop */
    try {
      const channel = await readRSS(subscription.url);
      const listenedTo = [];
      Object.entries(allRecent[subscription.url] || {}).forEach(([episode, timestamp]) => {
        const channelEpisode = channel.episodes[episode] || {};
        listenedTo.push({
          timestamp,
          logoUrl: channelEpisode.imageUrl,
          title: channelEpisode.title,
          url: episode,
        });
      });
      const recentEpisodes = _.sortBy(listenedTo, ep => -1 * ep.timestamp)
        .map(ep => ep.url);

      const description = subscription.description || channel.description;

      const fields = {
        recentEpisodes,
        description,
        logoUrl: subscription.logo_url || channel.imageUrl,
        maxActivity: _.max(listenedTo.map(ep => ep.timestamp)) || 0,
        maxEpisode: _.max(Object.values(channel.episodes).map(i => i.pubDate)) || 0,
        title: subscription.title || channel.title,
        website: subscription.website || channel.link,
      };

      const podcastId = createNodeId(`Podcast:${subscription.url}`);
      await createNode({
        ...fields,
        id: podcastId,
        internal: {
          contentDigest: hash(JSON.stringify(fields)),
          type: 'Podcast',
        },
        parent: null,
      });
      await createEpisodes(actions, createNodeId, podcastId, fields.logoUrl, listenedTo);
    } catch (err) {
      reporter.warn(`${err} when retreiving ${subscription.url}`);
    }
    /* eslint-enable no-await-in-loop */
  }
  pbar.done();
};

async function generateMarkdownDescription({ actions, node }) {
  const { createNode, createNodeField } = actions;
  if (!node.description) {
    return;
  }

  const descNodeId = `${node.id}-MarkdownDescription`;
  await createNode({
    id: descNodeId,
    parent: node.id,
    internal: {
      content: node.description,
      contentDigest: hash(node.description),
      type: 'PodcastMarkdownDescription',
      mediaType: 'text/markdown',
    },
  });
  await createNodeField({
    node,
    name: 'description___NODE',
    value: descNodeId,
  });
}

async function generateLogoImage({
  actions,
  cache,
  createNodeId,
  node,
  reporter,
  store,
}) {
  const { createNode, createNodeField } = actions;
  if (!node.logoUrl) {
    return;
  }

  try {
    const streamResp = await axios.get(
      node.logoUrl,
      { responseType: 'stream', timeout: HTTP_TIMEOUT },
    );
    const isHtmlPromise = new Promise((resolve, reject) => {
      streamResp.data.once('data', (chunk) => {
        resolve(chunk.compare(Buffer.from('<'), 0, 1, 0, 1) === 0);
      });
      streamResp.data.on('end', () => resolve(false));
      streamResp.data.on('error', error => reject(error));
    });
    if (await isHtmlPromise) {
      reporter.warn(`Invalid file for ${node.logoUrl}`);
    } else {
      const fileNode = await createRemoteFileNode({
        url: node.logoUrl,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        store,
        cache,
      });

      await createNodeField({
        node,
        name: 'logo___NODE',
        value: fileNode.id,
      });
    }
  } catch (err) {
    reporter.warn(`${err} when retrieving ${node.logoUrl}`);
  }
}

exports.onCreateNode = async (createNodeParams) => {
  if (createNodeParams.node.internal.owner === 'gatsby-source-gpodder') {
    await Promise.all([
      generateMarkdownDescription(createNodeParams),
      generateLogoImage(createNodeParams),
    ]);
  }
};
