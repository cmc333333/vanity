import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../util/set-page-title';

export default function CodeSample({ data }) {
  const { frontmatter, html } = data.markdownRemark;
  /* eslint-disable react/no-danger */
  return (
    <div>
      { setPageTitle(frontmatter.title) }
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
  /* eslint-enable react/no-danger */
}
CodeSample.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query($basename: String!) {
    markdownRemark(
      fields: { 
        basename: { eq: $basename }
        dirname: { eq: "code-samples" }
      }
    ) {
      frontmatter { title }
      html
    }
  }
`;
