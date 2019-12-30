import styled from '@emotion/styled';

export const MarkerlessList = styled.ul({
  listStyleType: 'none',
  marginBottom: 0,
  marginLeft: 0,
});

export const CommaDelimitedList = styled(MarkerlessList)({
  '& li': {
    display: 'inline',
    '::after': { content: '", "' },
  },
  '& li:last-child': {
    '::after': { content: 'none' },
  },
});
