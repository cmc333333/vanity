const path = require('path');

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const { relativePath } = getNode(node.parent);
    if (relativePath) {
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
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: '/cv/courses',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/education/topics/',
  });
  createRedirect({
    fromPath: '/cv/work',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/work/history/',
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
