import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

export default function SidebarLink({ children, to }) {
  return <li><Link css={{ color: '#346' }} to={to}>{ children }</Link></li>;
}
SidebarLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
