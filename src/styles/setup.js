import Typography from "typography";

import * as colors from "./colors";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  bodyFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
  scaleRatio: 1.5,
  bodyColor: colors.bodyText,
  bodyWeight: 400,
  headerWeight: 500,
  boldWeight: "bold",
  overrideStyles: ({ rhythm, scale }) => ({
    a: {
      color: colors.link,
      textDecoration: "none",
    },
    body: {
      backgroundColor: colors.backgroundPage,
    },
    h1: {
      ...scale(1),
      marginBottom: rhythm(4 / 4),
    },
    h2: {
      ...scale(3 / 4),
      marginBottom: rhythm(3 / 4),
    },
    h3: {
      ...scale(2 / 4),
      marginBottom: rhythm(2 / 4),
    },
    h4: {
      ...scale(1 / 4),
      marginBottom: rhythm(1 / 4),
    },
    h5: {
      ...scale(-1 / 4),
      marginBottom: rhythm(0 / 4),
    },
    h6: {
      ...scale(-2 / 4),
      marginBottom: rhythm(0 / 4),
    },
    img: {
      marginBottom: 0,
    },
  }),
});
export default typography;
