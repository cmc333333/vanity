import Link from 'gatsby-link';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import mmLeft from '../layouts/img/mm_left.gif';
import mmLeftCurve from '../layouts/img/mm_left_curve.gif';
import mmMiddle from '../layouts/img/mm_middle.gif';
import mmRight from '../layouts/img/mm_right.gif';
import mmRightCurve from '../layouts/img/mm_right_curve.gif';
import typography from '../util/typography';

export const mainMenuHeight = '50px';

export default function MainMenuLink({
  children,
  first,
  last,
  to,
}) {
  const pseudoEl = {
    content: ' ',
    display: 'inline-block',
    height: mainMenuHeight,
    verticalAlign: 'top',
    width: '25px',
  };
  return (
    <glamorous.Li
      css={{
        ':before': {
          ...pseudoEl,
          background: `url(${first ? mmLeftCurve : mmLeft}) no-repeat right top`,
        },
        ':after': {
          ...pseudoEl,
          background: `url(${last ? mmRightCurve : mmRight}) no-repeat left top`,
        },
      }}
      float="left"
      lineHeight={mainMenuHeight}
      listStyleType="none"
      marginLeft={first ? '10px' : null}
    >
      <Link
        css={{
          ...(typography.scale(1 / 2)),
          background: `#5A79A5 url(${mmMiddle}) repeat-x`,
          color: '#FFF',
          display: 'inline-block',
          fontVariant: 'small-caps',
          fontStyle: 'italic',
          height: mainMenuHeight,
          lineHeight: mainMenuHeight,
        }}
        to={to}
      >
        { children }
      </Link>
    </glamorous.Li>
  );
}
MainMenuLink.propTypes = {
  children: PropTypes.node.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  to: PropTypes.string.isRequired,
};
MainMenuLink.defaultProps = {
  first: false,
  last: false,
};
