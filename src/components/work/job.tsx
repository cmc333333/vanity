import Markdown from "markdown-to-jsx";
import * as React from "react";

import { columns, row } from "../../styles/grid";
import { trailingComma, trailingColon } from "../../styles/trailing";
import { scaleText } from "../../styles/typography";
import JobModel from "../../util/job";
import PortfolioProject from "../../util/portfolio-project";

interface ProjectSectionProps {
  children?: React.ReactNode;
  title: string;
}
const ProjectSection: React.FC<ProjectSectionProps> = ({ children, title }) => {
  if (children) {
    return (
      <div>
        <h3 css={scaleText(1 / 4)}>{title}</h3>
        <ul>{children}</ul>
      </div>
    );
  }
  return null;
};

const Project: React.FC<{ project: PortfolioProject }> = ({
  project: { summary, technology, title },
}) => {
  const techList = technology.map((tech, idx) => (
    <span css={idx === technology.length - 1 ? {} : trailingComma} key={tech}>
      {tech}
    </span>
  ));
  return (
    <li>
      <span css={{ ...trailingColon, fontStyle: "italic" }}>{title}</span>
      {summary}
      <br />
      {techList}
    </li>
  );
};

const Job: React.FC<{ job: JobModel }> = ({
  job: { company, end, html, impact, projects, start, title, url },
}) => {
  /* eslint-disable react/no-danger */
  const body = <div dangerouslySetInnerHTML={{ __html: html }} />;
  /* eslint-enable react/no-danger */
  const companyEl = url ? (
    <a css={{ whiteSpace: "nowrap" }} href={url}>
      {company}
    </a>
  ) : (
    <span css={{ whiteSpace: "nowrap" }}>{company}</span>
  );

  return (
    <div>
      <h2 css={row}>
        <span css={columns({ small: 12, medium: 8, large: 9 })}>
          {title} &mdash; {companyEl}
        </span>
        <span
          css={{
            ...columns({ small: 12, medium: 4, large: 3 }),
            fontSize: scaleText(0).fontSize /* maintain lineHeight */,
            fontWeight: "normal",
            textAlign: "right",
          }}
        >
          {start.format("MMM 'YY")} &ndash;{" "}
          {end ? end.format("MMM 'YY") : "Present "}
        </span>
      </h2>
      {body}
      <ProjectSection title="Demonstrated Impact">
        {impact.map((line) => (
          <li key={line}>
            <Markdown>{line}</Markdown>
          </li>
        ))}
      </ProjectSection>
      <ProjectSection title="Project Spotlight">
        {projects.map((proj) => (
          <Project key={proj.title} project={proj} />
        ))}
      </ProjectSection>
    </div>
  );
};
export default Job;
