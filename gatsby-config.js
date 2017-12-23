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
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {},
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
  ],
};
