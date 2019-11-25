import PropTypes from 'prop-types';
import React from 'react';

import { columns, scaleText, spacing } from '../styles';

export default function Sidebar({ children, title }) {
  return (
    <div
      css={{
        ...columns({ small: 12, medium: 2 }),
        background: '#CCC',
        border: 'solid thin #5A79A5',
        color: '#346',
        marginRight: '2%',
        paddingLeft: spacing(1 / 2),
        paddingRight: spacing(1 / 2),
        paddingTop: spacing(1 / 2),
      }}
    >
      <h2 css={{ ...scaleText(0), margin: 0 }}>{ title }</h2>
      <ul css={{ listStyleType: 'circle', marginLeft: spacing(1 / 2) }}>
        { children }
      </ul>
    </div>
  );
}
Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
