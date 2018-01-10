const path = require('path');

exports.onCreateNode = ({ boundActionCreators, getNode, node }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const { relativePath } = getNode(node.parent);
    createNodeField({
      name: 'basename',
      node,
      value: path.basename(relativePath, '.md'),
    });
    createNodeField({
      name: 'dirname',
      node,
      value: path.dirname(relativePath),
    });
  }
};

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  createRedirect({
    fromPath: '/cv/courses',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/education/topics/',
  });

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fields: {
            dirname: { eq: "code-samples" }
          }
        }
      ) {
        edges {
          node {
            fields {
              basename
            }
          }
        }
      }
    }
  `);
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `cv/code-samples/${node.fields.basename}`,
      component: path.resolve('./src/templates/code-sample.jsx'),
      context: {
        basename: node.fields.basename,
      },
    });
  });
};
