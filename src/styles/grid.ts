import { CSSObject } from "@emotion/serialize";

import mediaQueries from "./media-queries";

export const row: CSSObject = {
  "::before": {
    content: '" "',
    display: "table",
  },
  "::after": {
    clear: "both",
    content: '" "',
    display: "table",
  },
};

interface ColumnsArgs {
  small?: number;
  medium?: number;
  large?: number;
}

export const columns: (sizes: ColumnsArgs) => CSSObject = ({
  small = 0,
  medium = 0,
  large = 0,
}) => ({
  boxSizing: "border-box",
  float: "left",
  width: `calc(${small}/12 * 100%)`,
  [mediaQueries.medium]: {
    width: `calc(${medium || small}/12 * 100%)`,
  },
  [mediaQueries.large]: {
    width: `calc(${large || medium || small}/12 * 100%)`,
  },
});
