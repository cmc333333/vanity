import { Link } from "gatsby";
import * as React from "react";

interface Props {
  children: React.ReactNode;
  to: string;
}

const SidebarLink: React.FC<Props> = ({ children, to }) => (
  <li css={{ marginBottom: 0 }}>
    <Link css={{ color: "#346" }} to={to}>
      {children}
    </Link>
  </li>
);
export default SidebarLink;
