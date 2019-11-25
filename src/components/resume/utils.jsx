import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import { colors, columns, mediaQueries, row, spacing } from '../../styles';

export const baseFontSize = '14px';
export const baseSpace = spacing(1 / 4);

export const BorderedRow = styled.section({
  ...row,
  borderBottomColor: colors.bodyText,
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
});
export const HalfCol = styled.section({
  ...columns({ small: 12, medium: 6 }),
  paddingBottom: spacing(1 / 2),
});
export const ThirdCol = styled.section([
  columns({ small: 12, medium: 6, large: 4 }),
  {
    [mediaQueries.medium]: { paddingRight: baseSpace },
  },
]);
export const LeftCol = styled(HalfCol)({
  borderBottomColor: colors.bodyText,
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  [mediaQueries.medium]: {
    borderBottom: 'none',
    borderRightColor: colors.bodyText,
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
  },
  paddingRight: baseSpace,
});
export const RightCol = styled(HalfCol)({
  [mediaQueries.medium]: { paddingLeft: baseSpace },
});
export const SectionHeader = styled.h4({
  fontSize: '16px',
  marginBottom: baseSpace,
  marginTop: baseSpace,
});
export const SubSectionHeader = styled.h5({
  fontSize: baseFontSize,
  fontWeight: 'normal',
  marginBottom: 0,
  textDecoration: 'underline',
});
export const MarkerlessList = styled.ul({
  listStyleType: 'none',
  marginBottom: 0,
  marginLeft: 0,
});
export const InlineList = styled(MarkerlessList)({
  fontStyle: 'italic',
  '& li': {
    display: 'inline',
    '::after': { content: '" • "' },
  },
  '& li:last-child': {
    '::after': { content: 'none' },
  },
});

export function ParagraphWithTitle({ children, title }) {
  return (
    <div>
      <SubSectionHeader
        css={{ display: 'inline', float: 'left', marginRight: baseSpace }}
      >
        { title }
      </SubSectionHeader>
      <p>{ children }</p>
    </div>
  );
}
ParagraphWithTitle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
