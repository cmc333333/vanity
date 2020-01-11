const fs = require('fs');

const { createRemoteFileNode } = require('gatsby-source-filesystem');
const _ = require('lodash');
const MData = require('mdata');
const Moment = require('moment');
const pIter = require('p-iteration');
const Trakt = require('trakt.tv');

/* eslint-disable no-await-in-loop */

const traktClient = async (traktAuth) => {
  const traktSession = JSON.parse(process.env.TRAKT_SESSION);
  const client = new Trakt(traktAuth);

  await client.import_token(traktSession);
  fs.appendFileSync(
    '.env',
    `\nTRAKT_SESSION=${JSON.stringify(client.export_token())}\n`,
  );

  return client;
};

const fetchPoster = async (
  nodeId,
  traktType,
  ids,
  {
    actions: { createNode },
    cache,
    createNodeId,
    store,
  },
  { mdataAuth },
) => {
  const client = new MData(mdataAuth);

  const { poster } = await client.images[traktType](ids);
  if (poster) {
    const posterNode = await createRemoteFileNode({
      createNode,
      createNodeId,
      store,
      cache,
      parentNodeId: nodeId,
      url: poster,
    });
    return posterNode.id;
  }
  return null;
};

exports.sourceNodes = async (sourceNodeArgs, pluginArgs) => {
  const {
    actions,
    createContentDigest,
    createNodeId,
    reporter,
  } = sourceNodeArgs;
  const { traktAuth } = pluginArgs;
  const { createNode } = actions;
  const client = await traktClient(traktAuth);
  const movieHistory = await client.users.history({ limit: 10000, type: 'movies', username: 'me' });
  const episodeHistory = await client.users.history({ limit: 10000, type: 'shows', username: 'me' });
  const favoritesList = await client.users.list.items.get({ username: 'me', id: 10331465 });
  const favorites = new Set(favoritesList.map(f => f[f.type].ids.trakt));
  const perShow = {};
  episodeHistory.forEach((ep) => {
    // We rely on the history being sorted descending
    if (!perShow[ep.show.ids.trakt]) {
      perShow[ep.show.ids.trakt] = ep;
    }
  });
  const history = _.concat(movieHistory, Object.values(perShow));

  const pbar = reporter.createProgress('Trakts', history.length);
  pbar.start();
  await pIter.forEachSeries(history, async (traktEntry) => {
    pbar.tick();
    const nodeId = createNodeId(`Trakt:${traktEntry.id}`);
    const traktType = traktEntry.movie ? 'movie' : 'show';
    const summary = await client[`${traktType}s`].summary({
      extended: 'full',
      id: traktEntry[traktType].ids.trakt,
    });
    const favorite = favorites.has(traktEntry[traktType].ids.trakt);
    let posterId = null;
    if (favorite || Moment().diff(Moment(traktEntry.watched_at), 'days') < 60) {
      posterId = await fetchPoster(
        nodeId,
        traktType,
        traktEntry[traktType].ids,
        sourceNodeArgs,
        pluginArgs,
      );
    }
    await createNode({
      favorite,
      traktType,
      id: nodeId,
      poster___NODE: posterId,
      certification: summary && summary.certification,
      genres: summary && summary.genres,
      homepage: summary && summary.homepage,
      overview: summary && summary.overview,
      tagline: summary && summary.tagline,
      trailer: summary && summary.trailer,
      title: traktEntry[traktType].title,
      watchedAt: traktEntry.watched_at,
      internal: {
        contentDigest: createContentDigest(traktEntry),
        type: 'Trakt',
      },
      parent: null,
    });
  });
  pbar.done();
};
