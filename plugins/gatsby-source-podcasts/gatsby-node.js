const crypto = require('crypto');

const axios = require('axios');
const promisify = require('es6-promisify');
const moment = require('moment');
const callbackParseString = require('xml2js').parseString;

const parseString = promisify(callbackParseString);

exports.sourceNodes = async ({ actions }, pluginOptions) => {
  const { createNode } = actions;
  await Promise.all(pluginOptions.rsses.map(async (rssUrl) => {
    const { data } = await axios.get(rssUrl);
    const { rss: { channel } } = await parseString(data);
    const link = channel[0].link[0];
    const latest = channel[0].item.filter(item => item.enclosure)[0];

    const podcast = {
      description: channel[0].description[0].trim(),
      latestDate: moment(latest.pubDate[0]).unix() || 0,
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
