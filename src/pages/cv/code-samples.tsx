import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout, { cvSidebar } from "../../layouts";
import { trailingComma } from "../../styles/trailing";

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { dirname: { eq: "code-samples" } } }
      sort: { fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            basename
          }
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
interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: { basename: string };
          frontmatter: {
            summary: string;
            tags?: string[];
            title: string;
          };
        };
      }[];
    };
  };
}

const CodeSamples: React.FC<Props> = ({ data }) => {
  const children = data.allMarkdownRemark.edges
    .map((e) => e.node)
    .map((node) => {
      const { basename } = node.fields;
      const { summary, title } = node.frontmatter;
      const tags = node.frontmatter.tags || [];

      return (
        <li key={basename}>
          <Link to={`/cv/code-samples/${basename}`}>{title}</Link>
          <ul css={{ display: "inline-block", listStyleType: "none" }}>
            {tags.map((tag, idx) => (
              <li
                css={[
                  idx !== tags.length - 1 ? trailingComma : {},
                  { display: "inline" },
                ]}
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
          <div>{summary}</div>
        </li>
      );
    });
  return (
    <Layout sidebar={cvSidebar} title="Code Samples">
      <ul>{children}</ul>
    </Layout>
  );
};
export default CodeSamples;
