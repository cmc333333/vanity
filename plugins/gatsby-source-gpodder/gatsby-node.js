const crypto = require('crypto');

const axios = require('axios');
const promisify = require('es6-promisify');
const moment = require('moment');
const { Cookie } = require('tough-cookie');
const callbackParseString = require('xml2js').parseString;

const BASE_URL = 'https://gpodder.net';
const parseString = promisify(callbackParseString);
const RELEVENT_ACTIONS = new Set(['delete', 'play']);

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
    { params: { aggregated: true, since: weekAgo } },
  );
  const filteredActions = actions.filter(a => RELEVENT_ACTIONS.has(a.action));
  const byPodcast = {};
  filteredActions.forEach(({ episode, podcast, timestamp }) => {
    const { episodes, latestDate } = byPodcast[podcast] || {};

    byPodcast[podcast] = {
      latestDate: Math.max(moment(timestamp).unix(), latestDate || 0),
      episodes: [episode, ...(episodes || [])],
    };
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


exports.sourceNodes = async ({ actions, createNodeId }, { auth }) => {
  const { createNode } = actions;
  const client = await setupClient(auth);

  const allResp = await client.get(`subscriptions/${auth.username}.json`);
  const allRecent = await recentActivity(client, auth.username);
  await Promise.all(allResp.data.map(async (subscription) => {
    // Use a try-catch to allow some podcasts to error
    try {
      const channel = await readRSS(subscription.url);
      const { episodes, latestDate } = allRecent[subscription.url] || {};
      const recentTitles = (episodes || [])
        .map(url => channel.episodes[url])
        .filter(ep => ep)
        .map(ep => ep.title);

      const fields = {
        recentTitles,
        description: subscription.description || channel.description,
        logoUrl: subscription.logo_url || channel.imageUrl,
        maxActivity: latestDate || 0,
        maxEpisode: Math.max(...Object.values(channel.episodes).map(i => i.pubDate)),
        title: subscription.title || channel.title,
        url: subscription.url,
        website: subscription.website || channel.link,
      };
      const contentDigest = crypto.createHash('md5')
        .update(JSON.stringify(fields)).digest('hex');

      createNode({
        ...fields,
        id: createNodeId(`Podcast:${subscription.url}`),
        internal: { type: 'Podcast', contentDigest },
        parent: null,
        children: [],
      });
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }));
};

