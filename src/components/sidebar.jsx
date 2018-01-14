import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import { columns, scaleText, spacing } from '../styles';

export default function Sidebar({ children, title }) {
  return (
    <glamorous.Div
      background="#CCC"
      border="solid thin #5A79A5"
      color="#346"
      css={columns({ small: 12, medium: 2 })}
      marginRight="2%"
      paddingLeft={spacing(1 / 2)}
      paddingRight={spacing(1 / 2)}
      paddingTop={spacing(1 / 2)}
    >
      <glamorous.H2 margin={0} css={scaleText(0)}>
        { title }
      </glamorous.H2>
      <glamorous.Ul
        listStyleType="circle"
        marginLeft={spacing(1 / 2)}
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
