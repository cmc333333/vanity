import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../util/set-page-title';

function Job({ job }) {
  const { company, companyUrl, jobTitle } = job.frontmatter;
  /* eslint-disable react/no-danger */
  const body = (
    <div
      className="job-description"
      dangerouslySetInnerHTML={{ __html: job.html }}
    />
  );
  /* eslint-enable react/no-danger */
  return (
    <div>
      <h2 style={{ fontSize: '1.75em' }}>
        <span>{ jobTitle }</span>{' '}
        @{' '}
        { companyUrl ? <a href={companyUrl}>{ company }</a> : company }
      </h2>
      { body }
    </div>
  );
}
Job.propTypes = {
  job: PropTypes.shape({
    fields: PropTypes.shape({
      basename: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      company: PropTypes.string.isRequired,
      companyUrl: PropTypes.string,
      end: PropTypes.string,
      jobTitle: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Work({ data }) {
  const unsortedJobs = data.allMarkdownRemark.edges
    .map(e => ({
      ...e.node,
      frontmatter: {
        ...e.node.frontmatter,
        // ensure there's an end date
        end: e.node.frontmatter.end || new Date().toISOString(),
      },
    }));
  const jobs = _.orderBy(
    unsortedJobs,
    [j => j.frontmatter.end, j => j.frontmatter.start],
    ['desc', 'desc'],
  );

  return (
    <div>
      { setPageTitle('Work History') }
      { jobs.map(j => <Job key={j.fields.basename} job={j} />) }
    </div>
  );
}
Work.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: Job.propTypes.job,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query Work {
    allMarkdownRemark(
      filter: {
        fields: {
          dirname: { eq: "jobs" }
        }
      }
    ) {
      edges {
        node {
          fields { basename }
          frontmatter {
            company
            companyUrl
            end
            jobTitle
            start
          }
          html
        }
      }
    }
  }
`;
