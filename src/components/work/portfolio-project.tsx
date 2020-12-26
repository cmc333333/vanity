import styled from "@emotion/styled";
import * as React from "react";

import { columns, row } from "../../styles/grid";
import { spacing } from "../../styles/typography";
import PortfolioProject from "../../util/portfolio-project";

const halfCol = columns({ small: 6 });

interface LinksProps {
  source?: string;
  url?: string;
}
const Links: React.FC<LinksProps> = ({ source = "", url = "" }) => {
  if (!source && !url) {
    return null;
  }
  const sourceEl = source ? <a href={source}>View the Code</a> : null;
  const urlEl = url ? <a href={url}>See it Live</a> : null;
  const leftEl = <span css={halfCol}>{sourceEl || urlEl}</span>;
  const rightEl =
    source && url ? (
      <span css={{ ...halfCol, textAlight: "right" }}>{urlEl}</span>
    ) : null;

  return (
    <div css={{ ...row, marginBottom: spacing(1 / 4) }}>
      {leftEl}
      {rightEl}
    </div>
  );
};

const InlineLi = styled.li({ display: "inline", marginRight: spacing() });

const Project: React.FC<{ project: PortfolioProject }> = ({
  project: { html, source, technology, title, url },
}) => {
  /* eslint-disable react/no-danger */
  const body = <div dangerouslySetInnerHTML={{ __html: html }} />;
  /* eslint-enable react/no-danger */
  return (
    <div css={{ marginTop: spacing() }}>
      <h2 css={{ marginBottom: spacing(1 / 4) }}>{title}</h2>
      <Links source={source} url={url} />
      {body}
      <h3>Tech Stack</h3>
      <ul css={{ listStyleType: "none", marginBottom: 0, marginLeft: 0 }}>
        {technology.map((tech) => (
          <InlineLi key={tech}>{tech}</InlineLi>
        ))}
      </ul>
    </div>
  );
};
export default Project;
