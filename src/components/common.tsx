import styled from "@emotion/styled";

import * as colors from "../styles/colors";
import { row } from "../styles/grid";
import { spacing } from "../styles/typography";

export const MarkerlessList = styled.ul({
  listStyleType: "none",
  marginBottom: 0,
  marginLeft: 0,
});

interface CDLProps {
  conjunction?: string;
  inline?: boolean;
}
export const CommaDelimitedList = styled(MarkerlessList)(
  ({ conjunction, inline }: CDLProps) => ({
    display: inline ? "inline" : "block",
    "& li": {
      display: "inline",
      "::after": { content: '", "' },
    },
    "& li:last-child": {
      "::before": { content: conjunction ? `"${conjunction} "` : "none" },
      "::after": { content: "none" },
    },
  })
);

export const Row = styled.div(row);
export const ContentEntry = styled.div({
  borderBottomColor: colors.bodyText,
  borderBottomStyle: "solid",
  borderBottomWidth: "1px",
  marginBottom: spacing(0.5),
  paddingBottom: spacing(0.5),
});
