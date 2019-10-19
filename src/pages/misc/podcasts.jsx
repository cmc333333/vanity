import { graphql } from 'gatsby';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../layouts';
import styles, { colors } from '../../styles';

class Podcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAll: true };
  }

  componentDidMount() {
    this.setState({ showAll: false });
  }

  get recentTitlesEl() {
    const { recentTitles } = this.props;
    if (this.state.showAll || recentTitles.length < 6) {
      return (
        <ul>
          { recentTitles.map(t => <li>{t}</li>) }
        </ul>
      );
    } else {

      return (
        <>
          <ul>
            { recentTitles.slice(0, 5).map(t => <li>{t}</li>) }
          </ul>
          <glamorous.Button
            onClick={() => this.setState({ showAll: true })}
            background="transparent"
            border="none"
            color={colors.link}
            cursor="pointer"
          >
            Show all
          </glamorous.Button>
        </>
      );
    }
  }

  render() {
    const { description, title, website } = this.props;
    return (
      <glamorous.Div
        borderBottomColor={colors.bodyText}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        marginBottom={styles.rhythm(0.5)}
        paddingBottom={styles.rhythm(0.5)}
      >
        <glamorous.H4 display="inline-block">
          <a href={website}>{ title }</a>
        </glamorous.H4>
        <p>{ description }</p>
        { this.recentTitlesEl }
      </glamorous.Div>
    );
  }
}
Podcast.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  recentTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Podcasts({ data }) {
  return (
    <Layout title="Podcasts">
      { data.allPodcast.nodes.map(p => <Podcast key={p.link} {...p} />) }
    </Layout>
  );
}
Podcasts.propTypes = {
  data: PropTypes.shape({
    allPodcast: PropTypes.shape({
      nodes: PropTypes.arrayOf(Podcast.propTypes).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allPodcast(
      sort: {
        fields: [maxActivity, maxEpisode, title],
          order: [DESC, DESC, ASC]
      },
    ) {
      nodes {
        description
        logoUrl
        title
        website
        recentTitles
      }
    }
  }
`;
