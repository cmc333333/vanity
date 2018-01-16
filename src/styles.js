import { css } from 'glamor';
import gray from 'gray-percentage';
import Typography from 'typography';

const mediaQueries = {
  medium: '@media (min-width: 640px)',
  large: '@media (min-width: 1024px)',
};

export const colors = {
  background: '#dcdff6',
  backgroundPage: '#9caac6',
  bodyText: gray(23, 204),
  link: '#005580',
};

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  bodyFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
  scaleRatio: 1.5,
  bodyColor: colors.bodyText,
  bodyWeight: 400,
  headerWeight: 500,
  boldWeight: 'bold',
  overrideStyles: ({ rhythm, scale }) => ({
    a: {
      color: colors.link,
      textDecoration: 'none',
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
export const { rhythm: spacing, scale: scaleText } = typography;

function trailingStr(content) {
  return {
    '::after': {
      content,
      marginRight: spacing(1 / 4),
    },
  };
}

export const trailingComma = trailingStr(', ');
export const trailingColon = trailingStr(': ');

export function hideOn({ small = false, medium = false, large = false }) {
  return css({
    display: small ? 'none' : 'inherit',
    [mediaQueries.medium]: {
      display: medium ? 'none' : 'inherit',
    },
    [mediaQueries.large]: {
      display: large ? 'none' : 'inherit',
    },
  });
}

export const row = css({
  ':before': {
    content: ' ',
    display: 'table',
  },
  ':after': {
    clear: 'both',
    content: ' ',
    display: 'table',
  },
});

export function columns({ small = 0, medium = 0, large = 0 }) {
  return css({
    boxSizing: 'border-box',
    float: 'left',
    width: `calc(${small}/12 * 100%)`,
    [mediaQueries.medium]: {
      width: `calc(${medium || small}/12 * 100%)`,
    },
    [mediaQueries.large]: {
      width: `calc(${large || medium || small}/12 * 100%)`,
    },
  });
}
