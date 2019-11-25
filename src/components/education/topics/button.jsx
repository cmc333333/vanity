import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      css={{
        background: 'none',
        border: 0,
        color: '#000',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <span css={{ textDecoration: 'underline' }}>{ children }</span>
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string.isRequired,
};
