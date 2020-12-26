import * as React from "react";
import Graph from "react-graph-vis";
import { Network } from "vis-network";

import { tagGraph, TopicEntry } from "../../../util/topic-entry";
import { spacing } from "../../../styles/typography";

interface Props {
  entries: TopicEntry[];
  getVis: (vis: Network) => void;
  setTopics: (...topics: string[]) => void;
}

const Visualization: React.FC<Props> = ({ entries, getVis, setTopics }) => {
  const graph = tagGraph(entries);
  const options = {
    interaction: {
      multiselect: true,
      navigationButtons: true,
      selectConnectedEdges: false,
    },
    nodes: {
      scaling: {
        label: { min: 14, max: 28 },
      },
    },
  };
  const events = {
    select: ({ nodes }) => {
      setTopics(...nodes);
    },
  };
  return (
    <div
      css={{
        border: "1px solid silver",
        height: "400px",
        position: "relative",
      }}
    >
      <Graph
        events={events}
        getNetwork={getVis}
        graph={graph}
        options={options}
      />
      <p
        css={{
          background: "silver",
          border: "1px solid silver",
          bottom: 0,
          margin: 0,
          padding: spacing(1 / 4),
          position: "absolute",
          right: 0,
        }}
      >
        Ctrl-click or long-click to select multiple.
      </p>
    </div>
  );
};
export default Visualization;
