const gatsbySourceGpodder = {
  resolve: 'gatsby-source-gpodder',
  options: { auth: { username: 'cmc', password: process.env.GPODDER_PASSWORD } },
};
const fakeGatsbySourceGpodder = {
  resolve: 'gatsby-source-doubles',
  options: {
    schema: {
      maxActivity: 'random.number',
      maxEpisode: 'random.number',
      recentEpisodes: [{
        title: 'company.bs',
        logo: 'image',
      }],
      description: { childMarkdownRemark: { html: 'lorem.paragraph' } },
      logo: 'image',
      title: 'company.bs',
      website: 'internet.url',
    },
    count: 3,
    type: 'Podcast',
  },
};

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-source-goodreads',
      options: { userId: 21996113 },
    },
    process.env.FAKE_GPODDER ? fakeGatsbySourceGpodder : gatsbySourceGpodder,
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-remark-autolink-headers',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-glamor',
    'gatsby-plugin-lodash',
    'gatsby-plugin-nprogress',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-87597611-1',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/styles.js',
      },
    },
    'gatsby-transformer-sharp',
  ],
  siteMetadata: {
    siteUrl: 'http://cmlubinski.info',
  },
};
