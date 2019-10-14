import { graphql } from 'gatsby';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../layouts';
import styles, { colors } from '../../styles';

function Podcast({
  description,
  title,
  website,
  recentTitles,
}) {
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
      <ul>
        { recentTitles.map(t => <li>{t}</li>) }
      </ul>
    </glamorous.Div>
  );
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
