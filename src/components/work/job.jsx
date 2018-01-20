import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { columns, row, scaleText, trailingComma, trailingColon } from '../../styles';
import JobModel from '../../util/job';
import PortfolioProject from '../../util/portfolio-project';

function ProjectSection({ children, title }) {
  if (children && children.length) {
    return (
      <div>
        <h3 css={scaleText(1 / 4)}>{ title }</h3>
        <ul>{ children }</ul>
      </div>
    );
  }
  return null;
}
ProjectSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
ProjectSection.defaultProps = {
  children: null,
};


function Project({ project: { summary, technology, title } }) {
  const techList = technology.map((tech, idx) => (
    <span css={idx === technology.length - 1 ? {} : trailingComma} key={tech}>
      { tech }
    </span>
  ));
  return (
    <li>
      <glamorous.Span css={trailingColon} fontStyle="italic">
        { title }
      </glamorous.Span>
      { summary }<br />{ techList }
    </li>
  );
}
Project.propTypes = {
  project: PropTypes.instanceOf(PortfolioProject).isRequired,
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
  const companyEl = url ?
    <glamorous.A href={url} whiteSpace="nowrap">{ company }</glamorous.A> :
    <glamorous.Span whiteSpace="nowrap">{ company }</glamorous.Span>;

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
      <ProjectSection title="Demonstrated Impact">
        { impact.map(line => <li key={line}>{ line }</li>) }
      </ProjectSection>
      <ProjectSection title="Project Spotlight">
        { projects.map(proj => <Project key={proj.title} project={proj} />) }
      </ProjectSection>
    </div>
  );
}
Job.propTypes = {
  job: PropTypes.instanceOf(JobModel).isRequired,
};
