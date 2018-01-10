import Link from 'gatsby-link';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { trailingComma } from '../../styles';
import setPageTitle from '../../util/set-page-title';

export default function CodeSamples({ data }) {
  const children = data.allMarkdownRemark.edges.map(e => e.node).map((node) => {
    const { basename } = node.fields;
    const { summary, title } = node.frontmatter;
    const tags = node.frontmatter.tags || [];

    return (
      <li key={basename}>
        <Link to={`/cv/code-samples/${basename}`}>{ title }</Link>
        <glamorous.Ul
          display="inline-block"
          listStyleType="none"
        >
          { tags.map((tag, idx) => (
            <glamorous.Li
              css={idx !== tags.length - 1 ? trailingComma : {}}
              display="inline"
              key={tag}
            >
              { tag }
            </glamorous.Li>)) }
        </glamorous.Ul>
        <div>{ summary }</div>
      </li>
    );
  });
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
