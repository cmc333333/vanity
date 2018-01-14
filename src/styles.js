import { css } from 'glamor';

const mediaQueries = {
  medium: '@media (min-width: 640px)',
  large: '@media (min-width: 1024px)',
};

export const space = '1rem';
export const colors = {
  background: '#dcdff6',
};

export const trailingComma = css({
  '::after': {
    content: ', ',
    marginRight: '4px',
  },
});

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
