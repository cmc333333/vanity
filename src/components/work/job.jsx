import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { columns, row, scaleText, trailingColon } from '../../styles';
import JobModel from '../../util/job';
import TechProject from '../../util/tech-project';

function Impact({ impact }) {
  if (impact.length) {
    return (
      <div>
        <glamorous.H3 css={scaleText(1 / 4)}>Demonstrated Impact</glamorous.H3>
        <ul>
          { impact.map(item => <li key={item}>{ item }</li>) }
        </ul>
      </div>
    );
  }
  return null;
}
Impact.propTypes = {
  impact: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function Projects({ projects }) {
  if (projects.length) {
    return (
      <div>
        <h3 css={scaleText(1 / 4)}>Highlighted Projects</h3>
        <ul>
          { projects.map(project => (
            <li key={project.title}>
              <glamorous.Span css={trailingColon} fontStyle="italic">
                { project.title }
              </glamorous.Span>
              { project.summary }
            </li>)) }
        </ul>
      </div>
    );
  }
  return null;
}
Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(TechProject)).isRequired,
};

export default function Job({
  job: {
    company,
    end,
    html,
    impact,
    projects,
    start,
    title,
    url,
  },
}) {
  /* eslint-disable react/no-danger */
  const body = <div dangerouslySetInnerHTML={{ __html: html }} />;
  /* eslint-enable react/no-danger */
  const companyEl = url ? <a href={url}>{ company }</a> : company;

  return (
    <div>
      <h2 css={row}>
        <span css={columns({ small: 12, medium: 8, large: 9 })}>
          { title } &mdash; { companyEl }
        </span>
        <glamorous.Span
          css={columns({ small: 12, medium: 4, large: 3 })}
          fontSize={scaleText(0).fontSize /* maintain lineHeight */}
          fontWeight="normal"
          textAlign="right"
        >
          { start.format("MMM 'YY") } &ndash;{' '}
          { end ? end.format("MMM 'YY") : 'Present '}
        </glamorous.Span>
      </h2>
      { body }
      <Impact impact={impact} />
      <Projects projects={projects} />
    </div>
  );
}
Job.propTypes = {
  job: PropTypes.instanceOf(JobModel).isRequired,
};
