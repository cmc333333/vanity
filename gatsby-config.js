module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-goodreads',
      options: { userId: 21996113 },
    },
    {
      resolve: 'gatsby-source-podcasts',
      options: {
        rsses: [
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
        ],
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-nprogress',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-87597611-1',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
  ],
};
