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
      css={columns({ small: 12, medium: 2 })}
      marginRight="2%"
      marginTop={typography.rhythm(-2 / 3)}
      paddingLeft={typography.rhythm(1 / 3)}
      paddingRight={typography.rhythm(1 / 3)}
      paddingTop={typography.rhythm(2 / 3)}
    >
      <glamorous.H2 margin={0} css={typography.scale(0)}>
        { title }
      </glamorous.H2>
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
