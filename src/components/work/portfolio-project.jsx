import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import { columns, row, spacing } from '../../styles';
import PortfolioProject from '../../util/portfolio-project';

const halfCol = columns({ small: 6 });

function Links({ source, url }) {
  if (!source && !url) {
    return null;
  }
  const sourceEl = source ? <a href={source}>View the Code</a> : null;
  const urlEl = url ? <a href={url}>See it Live</a> : null;
  const leftEl = <span css={halfCol}>{ sourceEl || urlEl }</span>;
  const rightEl = source && url ?
    <span css={{ ...halfCol, textAlight: 'right' }}>{ urlEl }</span> : null;

  return (
    <div css={{ ...row, marginBottom: spacing(1 / 4) }}>
      { leftEl }
      { rightEl }
    </div>
  );
}
Links.propTypes = {
  source: PropTypes.string,
  url: PropTypes.string,
};
Links.defaultProps = {
  source: '',
  url: '',
};

const InlineLi = styled.li({ display: 'inline', marginRight: spacing() });

export default function Project({
  project: {
    html,
    source,
    technology,
    title,
    url,
  },
}) {
  /* eslint-disable react/no-danger */
  const body = <div dangerouslySetInnerHTML={{ __html: html }} />;
  /* eslint-enable react/no-danger */
  return (
    <div css={{ marginTop: spacing() }}>
      <h2 css={{ marginBottom: spacing(1 / 4) }}>{ title }</h2>
      <Links source={source} url={url} />
      { body }
      <h3>Tech Stack</h3>
      <ul css={{ listStyleType: 'none', marginBottom: 0, marginLeft: 0 }}>
        { technology.map(tech => <InlineLi key={tech}>{ tech }</InlineLi>) }
      </ul>
    </div>
  );
}
Project.propTypes = {
  project: PropTypes.instanceOf(PortfolioProject).isRequired,
};
