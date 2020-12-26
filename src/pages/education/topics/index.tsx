import { graphql } from "gatsby";
import * as _ from "lodash";
import * as moment from "moment";
import * as React from "react";
import { Network } from "vis-network";

import CurrentTopics from "../../../components/education/topics/current-topics";
import Entry from "../../../components/education/topics/entry";
import Visualization from "../../../components/education/topics/visualization";
import Layout, { educationSidebar } from "../../../layouts";
import { commonTags, TopicEntry } from "../../../util/topic-entry";

export const query = graphql`
  {
    Course: allCoursesYaml {
      edges {
        node {
          date: end
          id
          tags
          title
          url
        }
      }
    }
  }
`;

interface Node {
  date: string;
  id: string;
  tags: string[];
  title: string;
  url?: string;
}

interface GQL {
  data: {
    Course: {
      edges: { node: Node }[];
    };
  };
}

const parseTopicEntry: (node: Node, entryType: string) => TopicEntry = (
  node,
  entryType
) => ({
  entryType,
  date: moment(node.date),
  id: node.id,
  tags: new Set(node.tags),
  title: node.title,
  url: node.url,
});

interface TopicsState {
  inBrowser: boolean;
  selectedTopics: string[];
}
export default class Topics extends React.Component<GQL, TopicsState> {
  private common: Set<string>;

  private entries: TopicEntry[];

  private vis: Network | null;

  constructor(props: GQL) {
    super(props);
    const entryCollections = Object.entries(
      props.data
    ).map(([entryType, { edges }]) =>
      edges.map((e) => parseTopicEntry(e.node, entryType))
    );
    this.entries = _.orderBy(_.flatten(entryCollections), ["date"], ["desc"]);
    this.common = commonTags(this.entries);
    this.state = { inBrowser: false, selectedTopics: [] };

    this.vis = null;
  }

  componentDidMount: () => void = () => {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ inBrowser: true });
    /* eslint-enable react/no-did-mount-set-state */
  };

  componentDidUpdate: () => void = () => {
    const { selectedTopics } = this.state;
    if (this.vis) {
      this.vis.selectNodes(selectedTopics);
    }
  };

  setTopics: (...topics: string[]) => void = (...topics) => {
    this.setState({ selectedTopics: _.uniq(topics).sort() });
  };

  selectTopic: (topic: string) => void = (topic) => {
    const { selectedTopics } = this.state;
    const topics = selectedTopics.concat([topic]);
    this.setState({ selectedTopics: _.uniq(topics).sort() });
  };

  deactivate: (...toRemove: string[]) => void = (...toRemove) => {
    const { selectedTopics } = this.state;
    this.setState({
      selectedTopics: _.difference(selectedTopics, toRemove),
    });
  };

  filteredTopics: () => TopicEntry[] = () => {
    const { selectedTopics } = this.state;
    return selectedTopics.length
      ? this.entries.filter((e) => selectedTopics.some((t) => e.tags.has(t)))
      : this.entries;
  };

  render: () => React.ReactNode = () => {
    const { inBrowser, selectedTopics } = this.state;
    return (
      <Layout sidebar={educationSidebar} title="Education by Topic">
        <CurrentTopics deactivate={this.deactivate} topics={selectedTopics} />
        {inBrowser ? (
          <Visualization
            entries={this.entries}
            getVis={(vis: Network) => {
              this.vis = vis;
            }}
            setTopics={this.setTopics}
          />
        ) : null}
        {this.filteredTopics().map((topicEntry) => (
          <Entry
            key={topicEntry.id}
            selectTopic={this.selectTopic}
            selectableTopics={inBrowser ? this.common : new Set()}
            topicEntry={topicEntry}
          />
        ))}
      </Layout>
    );
  };
}
