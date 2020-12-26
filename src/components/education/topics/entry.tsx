import styled from "@emotion/styled";
import * as React from "react";

import { columns, row } from "../../../styles/grid";
import { trailingComma } from "../../../styles/trailing";
import { spacing } from "../../../styles/typography";
import { TopicEntry } from "../../../util/topic-entry";
import Button from "./button";

const Row = styled.div({
  ...row,
  borderBottom: "1px solid black",
  paddingBottom: spacing(1 / 2),
  paddingTop: spacing(1 / 2),
});

interface Props {
  selectTopic: (topic: string) => void;
  selectableTopics: Set<string>;
  topicEntry: TopicEntry;
}

const Entry: React.FC<Props> = ({
  selectTopic,
  selectableTopics,
  topicEntry,
}) => {
  const { date, tags, title, url } = topicEntry;
  const tagList = Array.from(tags).sort();
  const tagLinks = tagList.map((tag, idx) => {
    const style = idx === tagList.length - 1 ? {} : trailingComma;
    if (selectableTopics.has(tag)) {
      return (
        <Button css={style} key={tag} onClick={() => selectTopic(tag)}>
          {tag}
        </Button>
      );
    }
    return (
      <span css={style} key={tag}>
        {tag}
      </span>
    );
  });
  return (
    <Row>
      <div css={columns({ small: 12, medium: 12, large: 5 })}>
        {url ? <a href={url}>{title}</a> : title}
      </div>
      <div css={columns({ small: 12, medium: 4, large: 2 })}>
        {date.format("MMM Do, YYYY")}
      </div>
      <div css={columns({ small: 12, medium: 8, large: 5 })}>{tagLinks}</div>
    </Row>
  );
};
export default Entry;
