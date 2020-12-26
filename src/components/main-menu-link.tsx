import { Link } from "gatsby";
import * as React from "react";

import * as mmLeft from "../layouts/img/mm_left.gif";
import * as mmLeftCurve from "../layouts/img/mm_left_curve.gif";
import * as mmMiddle from "../layouts/img/mm_middle.gif";
import * as mmRight from "../layouts/img/mm_right.gif";
import * as mmRightCurve from "../layouts/img/mm_right_curve.gif";
import { scaleText } from "../styles/typography";

export const mainMenuHeight = "50px";

interface Props {
  children: React.ReactNode;
  first?: boolean;
  last?: boolean;
  to: string;
}

const MainMenuLink: React.FC<Props> = ({ children, first, last, to }) => {
  const pseudoEl = {
    content: '" "',
    display: "inline-block",
    height: mainMenuHeight,
    verticalAlign: "top",
    width: "25px",
  };
  return (
    <li
      css={{
        "::before": {
          ...pseudoEl,
          background: `url(${
            first ? mmLeftCurve : mmLeft
          }) no-repeat right top`,
        },
        "::after": {
          ...pseudoEl,
          background: `url(${
            last ? mmRightCurve : mmRight
          }) no-repeat left top`,
        },
        float: "left",
        lineHeight: mainMenuHeight,
        listStyleType: "none",
        marginLeft: first ? "10px" : null,
      }}
    >
      <Link
        css={{
          ...scaleText(1),
          background: `#5A79A5 url(${mmMiddle}) repeat-x`,
          color: "#FFF",
          display: "inline-block",
          fontVariant: "small-caps",
          fontStyle: "italic",
          height: mainMenuHeight,
          lineHeight: mainMenuHeight,
          paddingRight: "4px",
        }}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};
export default MainMenuLink;
