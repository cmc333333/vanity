import { graphql } from "gatsby";
import * as React from "react";

import ProjectComponent from "../../components/work/portfolio-project";
import Layout, { workSidebar } from "../../layouts";
import PortfolioProject from "../../util/portfolio-project";

export const query = graphql`
  {
    Portfolio: allMarkdownRemark(
      filter: { fields: { dirname: { eq: "portfolio" } } }
      sort: { order: DESC, fields: [frontmatter___start] }
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

interface Node {
  frontmatter: {
    job?: string;
    source?: string;
    summary: string;
    technology?: string[];
    title: string;
    url?: string;
  };
  html: string;
}

interface GQL {
  data: {
    Portfolio: {
      edges: { node: Node }[];
    };
  };
}

const parsePortfolio: (node: Node) => PortfolioProject = (node) => ({
  html: node.html,
  job: node.frontmatter.job || "",
  source: node.frontmatter.source || "",
  summary: node.frontmatter.summary,
  technology: node.frontmatter.technology || [],
  title: node.frontmatter.title,
  url: node.frontmatter.url || "",
});

const Portfolio: React.FC<GQL> = ({ data }) => {
  const projects = data.Portfolio.edges.map((e) => parsePortfolio(e.node));
  return (
    <Layout sidebar={workSidebar} title="Portfolio">
      {projects.map((project) => (
        <ProjectComponent key={project.title} project={project} />
      ))}
    </Layout>
  );
};
export default Portfolio;
