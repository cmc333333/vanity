import { css } from 'glamor';
import glamorous from 'glamorous';
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
    <span css={css(halfCol, { textAlight: 'right' })}>{ urlEl }</span> : null;

  return (
    <glamorous.Div css={row} marginBottom={spacing(1 / 4)}>
      { leftEl }
      { rightEl }
    </glamorous.Div>
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

const InlineLi = glamorous.li({ display: 'inline', marginRight: spacing() });

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
    <glamorous.Div marginTop={spacing()}>
      <glamorous.H2 marginBottom={spacing(1 / 4)}>{ title }</glamorous.H2>
      <Links source={source} url={url} />
      { body }
      <h3>Tech Stack</h3>
      <glamorous.Ul listStyleType="none" marginBottom={0} marginLeft={0}>
        { technology.map(tech => <InlineLi key={tech}>{ tech }</InlineLi>) }
      </glamorous.Ul>
    </glamorous.Div>
  );
}
Project.propTypes = {
  project: PropTypes.instanceOf(PortfolioProject).isRequired,
};
