import { graphql } from "gatsby";
import * as React from "react";

import Layout from "../layouts";

export const query = graphql`
  query($basename: String!) {
    markdownRemark(
      fields: { basename: { eq: $basename }, dirname: { eq: "code-samples" } }
    ) {
      frontmatter {
        title
      }
      html
    }
  }
`;
interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
      };
      html: string;
    };
  };
}

const CodeSample: React.FC<Props> = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  /* eslint-disable react/no-danger */
  return (
    <Layout title={frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
  /* eslint-enable react/no-danger */
};
export default CodeSample;
