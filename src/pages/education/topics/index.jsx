import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../../util/set-page-title';
import CurrentTopics from '../../../components/education/topics/current-topics';
import Entry from '../../../components/education/topics/entry';

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inBrowser: false, topics: [] };
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ inBrowser: true });
    /* eslint-enable react/no-did-mount-set-state */
  }

  activate(topic) {
    const topics = this.state.topics.concat([topic]);
    this.setState({ topics: _.uniq(topics) });
  }

  deactivate(...toRemove) {
    this.setState({
      topics: this.state.topics.filter(t => !toRemove.includes(t)),
    });
  }

  render() {
    const courses = this.props.data.allCoursesYaml.edges.map(e => ({
      entryType: 'Course',
      end: e.node.end,
      key: e.node.id,
      tags: new Set(e.node.tags),
      title: e.node.title,
      url: e.node.url || '',
    }));
    const entries = courses;
    const filtered = this.state.topics.length ?
      entries.filter(c => this.state.topics.some(t => c.tags.has(t))) :
      entries;
    const sorted = _.orderBy(filtered, ['end'], ['desc']);

    return (
      <div>
        { setPageTitle('Education by Topic') }
        <CurrentTopics
          deactivate={this.deactivate}
          topics={this.state.topics}
        />
        { sorted.map(e =>
          <Entry activate={this.activate} inBrowser={this.state.inBrowser} {...e} />) }
      </div>
    );
  }
}
Topics.propTypes = {
  data: PropTypes.shape({
    allCoursesYaml: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          end: PropTypes.string.isRequired,
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
    allCoursesYaml {
      edges {
        node {
          end
          id
          tags
          title
          url
        }
      }
    }
  }
`;
