import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';
import Graph from 'react-graph-vis';

import TopicEntry, { tagGraph } from '../../../util/topic-entry';
import typography from '../../../util/typography';


export default function Visualization({ entries, getVis, setTopics }) {
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
    <glamorous.Div border="1px solid silver" height="400px" position="relative">
      <Graph
        events={events}
        getNetwork={getVis}
        graph={graph}
        options={options}
      />
      <glamorous.P
        background="silver"
        border="1px solid silver"
        bottom={0}
        margin={0}
        padding={typography.rhythm(1 / 3)}
        position="absolute"
        right={0}
      >
        Ctrl-click or long-click to select multiple.
      </glamorous.P>
    </glamorous.Div>
  );
}
Visualization.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.instanceOf(TopicEntry)).isRequired,
  getVis: PropTypes.func.isRequired,
  setTopics: PropTypes.func.isRequired,
};
