const axios = require("axios");
const { promisify } = require("es6-promisify");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const _ = require("lodash");
const moment = require("moment");
const normalizeUrl = require("normalize-url");
const pIter = require("p-iteration");
const { Cookie } = require("tough-cookie");
const callbackParseString = require("xml2js").parseString;

const BASE_URL = "https://gpodder.net";
const HTTP_TIMEOUT = 60 * 1000;
const parseString = promisify(callbackParseString);

const normalizeEpisode = (asStr) =>
  normalizeUrl(asStr, { removeQueryParameters: [/.+/] });

const setupClient = async (auth) => {
  const client = axios.create({ baseURL: BASE_URL, timeout: HTTP_TIMEOUT });
  const authResp = await client.post(
    `api/2/auth/${auth.username}/login.json`,
    {},
    { auth }
  );
  const respCookie = authResp.headers["set-cookie"];
  const cookieStr = (respCookie instanceof Array ? respCookie : [respCookie])
    .map((str) => Cookie.parse(str).cookieString())
    .join(";");

  client.defaults.headers.cookie = cookieStr;
  return client;
};

const recentActivity = async (client, username) => {
  const weekAgo = moment().subtract(7, "days").unix();
  const {
    data: { actions },
  } = await client.get(`api/2/episodes/${username}.json`, {
    params: { since: weekAgo },
  });
  const plays = actions.filter((a) => a.action === "play").reverse();
  // Grab the latest action per episode (assumes GPodder sorts the actions)
  return _.uniqBy(plays, "episode");
};

const readRSS = async (url) => {
  const { data } = await axios.get(url, { timeout: HTTP_TIMEOUT });
  const { rss } = await parseString(data);
  const rawChannel = rss.channel[0];
  const episodes = {};

  const podcastImage =
    (rawChannel.image && rawChannel.image[0].url[0]) ||
    (rawChannel["itunes:image"] && rawChannel["itunes:image"][0].$.href);

  rawChannel.item
    .filter((item) => item.enclosure)
    .forEach((item) => {
      const normEpisode = normalizeEpisode(item.enclosure[0].$.url);
      const episodeImage =
        (item["itunes:image"] && item["itunes:image"][0].$.href) ||
        (item["media:thumbnail"] && item["media:thumbnail"][0].$.url);
      episodes[normEpisode] = {
        description:
          (item.description && item.description[0]) ||
          (item["itunes:summary"] && item["itunes:summary"][0]),
        imageUrl: episodeImage !== podcastImage ? episodeImage : null,
        pubDate: moment(item.pubDate[0]).unix(),
        title: item.title[0],
        url: normEpisode,
      };
    });

  return {
    episodes,
    description: rawChannel.description && rawChannel.description[0].trim(),
    imageUrl: podcastImage,
    link: rawChannel.link && rawChannel.link[0],
    title: rawChannel.title && rawChannel.title[0],
  };
};

const createDescription = async (sourceNodesArgs, podcastId, description) => {
  if (!description) {
    return null;
  }

  const {
    actions: { createNode },
    createContentDigest,
    createNodeId,
  } = sourceNodesArgs;
  const descriptionId = createNodeId(`PodcastDescription:${podcastId}`);

  await createNode({
    id: descriptionId,
    parent: podcastId,
    internal: {
      content: description,
      contentDigest: createContentDigest(description),
      type: "PodcastMarkdownDescription",
      mediaType: "text/markdown",
    },
  });

  return descriptionId;
};

const createImage = async (sourceNodesArgs, parentId, url) => {
  if (!url) {
    return null;
  }
  const {
    actions: { createNode },
    cache,
    createNodeId,
    reporter,
    store,
  } = sourceNodesArgs;

  try {
    const streamResp = await axios.get(url, {
      responseType: "stream",
      timeout: HTTP_TIMEOUT,
    });
    const isHtmlPromise = new Promise((resolve, reject) => {
      streamResp.data.once("data", (chunk) => {
        resolve(chunk.compare(Buffer.from("<"), 0, 1, 0, 1) === 0);
      });
      streamResp.data.on("end", () => resolve(false));
      streamResp.data.on("error", (error) => reject(error));
    });
    if (await isHtmlPromise) {
      reporter.warn(`Invalid file for ${url}`);
    } else {
      const fileNode = await createRemoteFileNode({
        cache,
        createNode,
        createNodeId,
        reporter,
        store,
        url,
        parentNodeId: parentId,
      });
      return fileNode.id;
    }
  } catch (err) {
    reporter.warn(`${err} when retrieving ${url}`);
  }
  return null;
};

const createEpisodes = async (
  sourceNodesArgs,
  podcastId,
  recentListens,
  channel
) => {
  const {
    actions: { createNode },
    createContentDigest,
    createNodeId,
  } = sourceNodesArgs;
  const ids = [];
  await pIter.forEach(recentListens, async ({ episode }) => {
    const episodeId = createNodeId(`PodcastEpisode:${episode}`);
    const channelEpisode = channel.episodes[normalizeEpisode(episode)];
    if (channelEpisode) {
      ids.push(episodeId);
      await createNode({
        id: episodeId,
        logo___NODE: await createImage(
          sourceNodesArgs,
          podcastId,
          channelEpisode.imageUrl
        ),
        podcast___NODE: podcastId,
        title: channelEpisode.title,
        internal: {
          contentDigest: createContentDigest(channelEpisode),
          type: "PodcastEpisode",
        },
        parent: null,
      });
    }
  });
  return ids;
};

exports.sourceNodes = async (sourceNodesArgs, { auth }) => {
  const {
    actions: { createNode },
    createContentDigest,
    createNodeId,
    reporter,
  } = sourceNodesArgs;
  const client = await setupClient(auth);

  const subscriptionsResp = await client.get(
    `subscriptions/${auth.username}.json`
  );
  const activity = _.groupBy(
    await recentActivity(client, auth.username),
    "podcast"
  );

  const pbar = reporter.createProgress(
    "Podcasts",
    subscriptionsResp.data.length
  );
  pbar.start();

  await pIter.forEachSeries(subscriptionsResp.data, async (subscription) => {
    pbar.tick();
    try {
      const podcastId = createNodeId(`Podcast:${subscription.url}`);
      const channel = await readRSS(subscription.url);
      const recentListens = activity[subscription.url] || [];

      const recentIds = await createEpisodes(
        sourceNodesArgs,
        podcastId,
        recentListens,
        channel
      );
      const description = subscription.description || channel.description;
      const logo = subscription.logo_url || channel.imageUrl;
      const podcastNode = {
        id: podcastId,
        recentEpisodes___NODE: recentIds,
        description___NODE: await createDescription(
          sourceNodesArgs,
          podcastId,
          description
        ),
        logo___NODE: await createImage(sourceNodesArgs, podcastId, logo),
        maxActivity: _.max(recentListens.map((ep) => ep.timestamp)) || "",
        maxEpisode:
          _.max(Object.values(channel.episodes).map((i) => i.pubDate)) || 0,
        title: subscription.title || channel.title,
        website: subscription.website || channel.link,
      };
      await createNode({
        ...podcastNode,
        internal: {
          contentDigest: createContentDigest(podcastNode),
          type: "Podcast",
        },
        parent: null,
      });
    } catch (err) {
      reporter.warn(`${err} when retreiving ${subscription.url}`);
    }
  });
  pbar.done();
};
