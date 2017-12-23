import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../util/set-page-title';

export default function CodeSamples({ data }) {
  const children = data.allMarkdownRemark.edges.map(e => (
    <li key={e.node.fields.basename}>
      <Link to={`/cv/code-samples/${e.node.fields.basename}`}>
        { e.node.frontmatter.title }
      </Link>
      <ul className="categories">
        { (e.node.frontmatter.tags || []).map(t => <li key={t}>{ t }</li>) }
      </ul>
      <div>{ e.node.frontmatter.summary }</div>
    </li>
  ));
  return (
    <div>
      { setPageTitle('Code Samples') }
      <ul>{ children }</ul>
    </div>
  );
}
CodeSamples.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          fields: PropTypes.shape({
            basename: PropTypes.string.isRequired,
          }).isRequired,
          frontmatter: PropTypes.shape({
            summary: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query Samples {
    allMarkdownRemark(
      filter: {
        fields: {
          dirname: { eq: "code-samples" }
        }
      }
      sort: {
        fields: [frontmatter___title]
      }
    ) {
      edges {
        node {
          fields { basename }
          frontmatter {
            summary
            tags
            title
          }
        }
      }
    }
  }
`;
