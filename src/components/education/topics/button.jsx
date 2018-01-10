import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <glamorous.Button
      background="none"
      border={0}
      color="#000"
      cursor="pointer"
      padding={0}
      {...props}
    >
      <glamorous.Span textDecoration="underline">{ children }</glamorous.Span>
    </glamorous.Button>
  );
}
Button.propTypes = {
  children: PropTypes.string.isRequired,
};
