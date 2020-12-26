import { graphql } from "gatsby";
import * as _ from "lodash";
import * as moment from "moment";
import * as React from "react";

import JobComponent from "../../components/work/job";
import Layout, { workSidebar } from "../../layouts";
import * as colors from "../../styles/colors";
import Job, { Event } from "../../util/job";
import PortfolioProject from "../../util/portfolio-project";

export const query = graphql`
  {
    Jobs: allMarkdownRemark(
      filter: { fields: { dirname: { eq: "jobs" } } }
      sort: { order: DESC, fields: [frontmatter___start] }
    ) {
      edges {
        node {
          fields {
            basename
          }
          frontmatter {
            color
            company
            end
            events {
              date
              title
            }
            impact
            start
            shortTitle
            title
            url
          }
          html
          id
        }
      }
    }
    Portfolio: allMarkdownRemark(
      filter: { fields: { dirname: { eq: "portfolio" } } }
      sort: { order: DESC, fields: [frontmatter___start] }
    ) {
      edges {
        node {
          frontmatter {
            job
            source
            summary
            technology
            title
            url
          }
        }
      }
    }
  }
`;

interface JobNode {
  fields: { basename: string };
  frontmatter: {
    color?: string;
    company: string;
    end?: string;
    events?: { date: string; title: string }[];
    impact?: string[];
    start: string;
    shortTitle?: string;
    title: string;
    url?: string;
  };
  id: string;
  html: string;
}

interface PortfolioNode {
  frontmatter: {
    job?: string;
    source?: string;
    summary: string;
    technology?: string[];
    title: string;
    url?: string;
  };
}

interface GQL {
  data: {
    Jobs: { edges: { node: JobNode }[] };
    Portfolio: { edges: { node: PortfolioNode }[] };
  };
}

const parseEvent: (event: { date: string; title: string }) => Event = (
  event
) => ({
  date: moment(event.date),
  title: event.title,
});

const parseJob: (node: JobNode, projects: PortfolioProject[]) => Job = (
  node,
  projects
) => ({
  projects,
  color: node.frontmatter.color || colors.background,
  company: node.frontmatter.company,
  html: node.html,
  id: node.id,
  impact: node.frontmatter.impact || [],
  end: node.frontmatter.end ? moment(node.frontmatter.end) : undefined,
  events: (node.frontmatter.events || []).map(parseEvent),
  start: moment(node.frontmatter.start),
  shortTitle: node.frontmatter.shortTitle,
  title: node.frontmatter.title,
  url: node.frontmatter.url,
});

const WorkHistory: React.FC<GQL> = ({ data }) => {
  const projectsByJob = _.groupBy(
    data.Portfolio.edges.map((e) => e.node.frontmatter as PortfolioProject),
    "job"
  );
  const jobs = data.Jobs.edges.map((e) =>
    parseJob(e.node, projectsByJob[e.node.fields.basename] || [])
  );
  return (
    <Layout sidebar={workSidebar} title="Work History">
      {jobs.map((job) => (
        <JobComponent key={job.id} job={job} />
      ))}
    </Layout>
  );
};
export default WorkHistory;
