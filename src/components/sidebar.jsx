import { css } from 'glamor';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import typography from '../util/typography';
import { columns } from '../styles';

export default function Sidebar({ children, title }) {
  return (
    <glamorous.Div
      background="#CCC"
      border="solid thin #5A79A5"
      color="#346"
      css={css(columns(2), { marginRight: '2%' })}
      marginTop={typography.rhythm(-2 / 3)}
      paddingLeft={typography.rhythm(1 / 3)}
      paddingRight={typography.rhythm(1 / 3)}
      paddingTop={typography.rhythm(2 / 3)}
    >
      <h2 css={css(typography.scale(0), { margin: 0 })}>
        { title }
      </h2>
      <glamorous.Ul
        listStyleType="circle"
        marginLeft={typography.rhythm(2 / 3)}
      >
        { children }
      </glamorous.Ul>
    </glamorous.Div>
  );
}
Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
