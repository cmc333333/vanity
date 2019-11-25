import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

export default function SidebarLink({ children, to }) {
  return (
    <li css={{ marginBottom: 0 }}>
      <Link css={{ color: '#346' }} to={to}>{ children }</Link>
    </li>
  );
}
SidebarLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
