import * as React from "react";

import { columns } from "../styles/grid";
import { scaleText, spacing } from "../styles/typography";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Sidebar: React.FC<Props> = ({ children, title }) => (
  <div
    css={{
      ...columns({ small: 12, medium: 2 }),
      background: "#CCC",
      border: "solid thin #5A79A5",
      color: "#346",
      marginRight: "2%",
      paddingLeft: spacing(1 / 2),
      paddingRight: spacing(1 / 2),
      paddingTop: spacing(1 / 2),
    }}
  >
    <h2 css={{ ...scaleText(0), margin: 0 }}>{title}</h2>
    <ul css={{ listStyleType: "circle", marginLeft: spacing(1 / 2) }}>
      {children}
    </ul>
  </div>
);
export default Sidebar;
