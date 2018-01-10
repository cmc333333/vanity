import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../../util/set-page-title';
import CurrentTopics from '../../../components/education/topics/current-topics';
import Entry from '../../../components/education/topics/entry';
import Visualization from '../../../components/education/topics/visualization';
import TopicEntry, { commonTags } from '../../../util/topic-entry';


export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    const entryCollections = Object.entries(props.data)
      .map(([entryType, { edges }]) =>
        edges.map(e => new TopicEntry({ ...e.node, entryType })));
    this.entries = _.orderBy(_.flatten(entryCollections), ['date'], ['desc']);
    this.common = commonTags(this.entries);
    this.state = { inBrowser: false, selectedTopics: [] };

    this.deactivate = this.deactivate.bind(this);
    this.selectTopic = this.selectTopic.bind(this);
    this.setTopics = this.setTopics.bind(this);
    this.vis = null;
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ inBrowser: true });
    /* eslint-enable react/no-did-mount-set-state */
  }

  componentDidUpdate() {
    if (this.vis) {
      this.vis.selectNodes(this.state.selectedTopics);
    }
  }

  setTopics(...topics) {
    this.setState({ selectedTopics: _.uniq(topics).sort() });
  }

  selectTopic(topic) {
    const topics = this.state.selectedTopics.concat([topic]);
    this.setState({ selectedTopics: _.uniq(topics).sort() });
  }

  deactivate(...toRemove) {
    this.setState({
      selectedTopics: _.difference(this.state.selectedTopics, toRemove),
    });
  }

  filteredTopics() {
    return this.state.selectedTopics.length ?
      this.entries.filter(e =>
        this.state.selectedTopics.some(t => e.tags.has(t))) :
      this.entries;
  }

  render() {
    return (
      <div>
        { setPageTitle('Education by Topic') }
        <CurrentTopics deactivate={this.deactivate} topics={this.state.selectedTopics} />
        { this.state.inBrowser ?
          <Visualization
            entries={this.entries}
            getVis={(vis) => { this.vis = vis; }}
            setTopics={this.setTopics}
          /> : null }
        { this.filteredTopics().map(topicEntry => (
          <Entry
            key={topicEntry.id}
            selectTopic={this.selectTopic}
            selectableTopics={this.state.inBrowser ? this.common : new Set()}
            topicEntry={topicEntry}
          />)) }
      </div>
    );
  }
}
Topics.propTypes = {
  data: PropTypes.shape({
    Course: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          date: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          tags: PropTypes.arrayOf(PropTypes.string),
          title: PropTypes.string.isRequired,
          url: PropTypes.string,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query Topics {
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
