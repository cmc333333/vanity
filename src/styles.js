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

export function columns(spanOnSmall, spanOnMedium, spanOnLarge) {
  return css(
    {
      boxSizing: 'border-box',
      float: 'left',
      width: `calc(${spanOnSmall}/12 * 100%)`,
    },
    spanOnMedium ? {
      '@media (min-width: 640px)': {
        width: `calc(${spanOnMedium}/12 * 100%)`,
      },
    } : {},
    spanOnLarge ? {
      '@media (min-width: 1024px)': {
        width: `calc(${spanOnLarge}/12 * 100%)`,
      },
    } : {},
  );
}
