import { css } from 'glamor';

export const space = '1rem';

export const trailingComma = css({
  '::after': {
    content: ', ',
    marginRight: '4px',
  },
});

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

export function columns(width) {
  return css({
    boxSizing: 'border-box',
    float: 'left',
    width: `calc(${width}/12 * 100%)`,
  });
}
