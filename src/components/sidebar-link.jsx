import { Link } from 'gatsby';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

export default function SidebarLink({ children, to }) {
  return (
    <glamorous.Li marginBottom={0}>
      <Link css={{ color: '#346' }} to={to}>{ children }</Link>
    </glamorous.Li>
  );
}
SidebarLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
