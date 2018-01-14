import PropTypes from 'prop-types';
import React from 'react';

import Timeline from '../../components/work-history/timeline';
import Job from '../../util/job';
import setPageTitle from '../../util/set-page-title';

export default function Chronology({ data }) {
  const jobs = data.Jobs.edges.map(e => new Job({
    color: e.node.frontmatter.color,
    company: e.node.frontmatter.company,
    id: e.node.fields.basename,
    end: e.node.frontmatter.end,
    events: e.node.frontmatter.events,
    start: e.node.frontmatter.start,
    shortTitle: e.node.frontmatter.shortTitle,
    title: e.node.frontmatter.title,
  }));
  return (
    <div>
      { setPageTitle('Work Chronology') }
      <Timeline jobs={jobs} />
    </div>
  );
}
Chronology.propTypes = {
  data: PropTypes.shape({
    Jobs: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          fields: PropTypes.shape({
            basename: PropTypes.string.isRequired,
          }).isRequired,
          frontmatter: PropTypes.shape({
            color: PropTypes.string,
            company: PropTypes.string.isRequired,
            end: PropTypes.string,
            events: PropTypes.arrayOf(PropTypes.shape({
              date: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            })),
            start: PropTypes.string.isRequired,
            shortTitle: PropTypes.string,
            title: PropTypes.string.isRequired,
            url: PropTypes.string,
          }).isRequired,
          html: PropTypes.string.isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query Q {
    Jobs: allMarkdownRemark(
      filter: {
        fields: {
          dirname: { eq: "jobs" }
        }
      }
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
            start
            shortTitle
            title
            url
          }
          html
        }
      }
    }
  }
`;
