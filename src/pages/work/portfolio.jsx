import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import ProjectComponent from '../../components/work/portfolio-project';
import Layout from '../../layouts';
import PortfolioProject from '../../util/portfolio-project';
import setPageTitle from '../../util/set-page-title';

export default function Portfolio({ data }) {
  const projects = data.Portfolio.edges.map(e =>
    new PortfolioProject({ ...e.node.frontmatter, html: e.node.html }));
  return (
    <Layout>
      { setPageTitle('Portfolio') }
      { projects.map(project =>
        <ProjectComponent key={project.title} project={project} />) }
    </Layout>
  );
}
Portfolio.propTypes = {
  data: PropTypes.shape({
    Portfolio: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            job: PropTypes.string,
            source: PropTypes.string,
            summary: PropTypes.string.isRequired,
            technology: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string.isRequired,
            url: PropTypes.string,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    Portfolio: allMarkdownRemark(
      filter: {
        fields: {
          dirname: { eq: "portfolio" }
        }
      }
      sort: {
        order: DESC
        fields: [ frontmatter___start ]
      }
    ) {
      edges {
        node {
          frontmatter {
            source
            summary
            technology
            title
            url
          }
          html
        }
      }
    }
  }
`;
