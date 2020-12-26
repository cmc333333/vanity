import * as React from "react";

import { columns, row } from "../../../styles/grid";
import { trailingComma } from "../../../styles/trailing";
import { spacing } from "../../../styles/typography";
import Button from "./button";

interface Props {
  deactivate: (...topics: string[]) => void;
  topics: string[];
}

const CurrentTopics: React.FC<Props> = ({ deactivate, topics }) => {
  if (topics.length) {
    const deactivateList = topics.map((topic, idx) => (
      <Button
        css={[
          idx <= topics.length - 2 ? trailingComma : {},
          idx === topics.length - 2
            ? { "::after": { content: '", or "' } }
            : {},
        ]}
        key={topic}
        onClick={() => deactivate(topic)}
      >
        {topic}
      </Button>
    ));
    return (
      <fieldset
        css={{ ...row, paddingLeft: spacing(), paddingRight: spacing() }}
      >
        <legend
          css={{
            ...columns({ small: 12, medium: 2, large: 1 }),
            border: 0,
            fontWeight: "bold",
          }}
        >
          Topics:
        </legend>
        <div css={columns({ small: 12, medium: 8, large: 9 })}>
          {" "}
          {deactivateList}{" "}
        </div>
        <div
          css={{
            ...columns({ small: 12, medium: 2, large: 2 }),
            textAlign: "right",
          }}
        >
          <Button onClick={() => deactivate(...topics)}>Remove All</Button>
        </div>
      </fieldset>
    );
  }
  return null;
};
export default CurrentTopics;
