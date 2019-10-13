const crypto = require('crypto');

const axios = require('axios');
const promisify = require('es6-promisify');
const moment = require('moment');
const callbackParseString = require('xml2js').parseString;

const parseString = promisify(callbackParseString);

function parseItem(item) {
  const imgLg = item.book_large_image_url[0];
  const imgMd = item.book_medium_image_url[0];
  const shelves = item.user_shelves[0].split(', ');
  return {
    added: moment(item.pubDate[0]).unix(),
    author: item.author_name[0],
    currentlyReading: shelves.includes('currently-reading'),
    description: item.book_description[0],
    imgLg: imgLg.includes('nocover') ? null : imgLg,
    imgMd: imgMd.includes('nocover') ? null : imgMd,
    link: item.link[0],
    published: item.book_published[0],
    technical: shelves.includes('technical'),
    toRead: shelves.includes('to-read'),
    title: item.title[0],
  };
}

exports.sourceNodes = async ({ actions }, pluginOptions) => {
  const { createNode } = actions;
  const { data } = await axios.get(
    `http://www.goodreads.com/review/list_rss/${pluginOptions.userId}`);
  const { rss: { channel } } = await parseString(data);
  channel[0].item.forEach((item) => {
    const book = parseItem(item);
    const contentDigest = crypto.createHash('md5')
      .update(JSON.stringify(book)).digest('hex');
    createNode({
      book,
      id: `Goodreads:${item.book_id[0]}`,
      parent: null,
      children: [],
      internal: { type: 'Goodreads', contentDigest },
    });
  });
};
