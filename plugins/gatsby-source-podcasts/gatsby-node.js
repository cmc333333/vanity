const crypto = require('crypto');

const axios = require('axios');
const promisify = require('es6-promisify');
const moment = require('moment');
const callbackParseString = require('xml2js').parseString;

const parseString = promisify(callbackParseString);

const rsses = [
  'http://chariotsolutions.com/podcasts/show/all-shows/feed/',
  'http://feeds.99percentinvisible.org/99percentinvisible',
  'http://feeds.feedburner.com/freakonomicsradio',
  'http://feeds.feedburner.com/javaposse',
  'http://feeds.feedburner.com/linuxoutlaws',
  'http://feeds.feedburner.com/se-radio',
  'http://feeds.feedburner.com/tedtalks_audio',
  'http://feeds.feedburner.com/TheMemoryPalace',
  'http://feeds.feedburner.com/ThisDevelopersLife',
  'http://feeds.themoth.org/themothpodcast',
  'http://feeds.thisamericanlife.org/talpodcast',
  'http://feeds.twit.tv/floss.xml',
  'http://leo.am/podcasts/sn',
  'http://omegataupodcast.net/category/podcast-en/feed/',
  'http://rss.sciam.com/sciam/60secsciencepodcast',
  'https://www.gamerswithjobs.com/taxonomy/term/408/0/feed',
  'http://thescalawags.libsyn.com/rss',
  'http://www.alifewellwasted.com/episodes/episodes.xml',
  'http://www.npr.org/rss/podcast.php?id=35',
  'http://www.npr.org/rss/podcast.php?id=510184',
  'http://www.npr.org/rss/podcast.php?id=510289',
  'http://www.starshipsofa.com/feed/',
  'http://www.theskepticsguide.org/feed/sgu',
];

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;
  await Promise.all(rsses.map(async (rssUrl) => {
    const { data } = await axios.get(rssUrl);
    const { rss: { channel } } = await parseString(data);
    const link = channel[0].link[0];
    const latest = channel[0].item[0];

    const podcast = {
      description: channel[0].description[0].trim(),
      latestDate: moment(latest.pubDate[0]).unix(),
      latestUrl: latest.enclosure[0].$.url,
      link,
      title: channel[0].title[0],
    };
    const contentDigest = crypto.createHash('md5')
      .update(JSON.stringify(podcast)).digest('hex');
    createNode({
      id: `Podcast:${link}`,
      internal: { type: 'Podcast', contentDigest },
      parent: null,
      children: [],
      podcast,
    });
  }));
};
