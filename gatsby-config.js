module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-source-goodreads',
    'gatsby-source-podcasts',
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
