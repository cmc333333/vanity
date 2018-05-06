import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../util/set-page-title';
import styles, { colors } from '../../styles';

function Podcast({
  description,
  latestUrl,
  link,
  title,
}) {
  return (
    <glamorous.Div
      borderBottomColor={colors.bodyText}
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      marginBottom={styles.rhythm(0.5)}
      paddingBottom={styles.rhythm(0.5)}
    >
      <h4 style={{ display: 'inline-block' }}><a href={link}>{ title }</a></h4>
      {' | '}
      <a href={latestUrl}>[Play]</a>
      <div dangerouslySetInnerHTML={{ __html: description}} />
    </glamorous.Div>
  );
}
Podcast.propTypes = {
  description: PropTypes.string.isRequired,
  latestUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default function Podcasts({ data }) {
  const podcasts = data.allPodcast.edges.map(e => e.node.podcast);
  return (
    <div>
      { setPageTitle('Podcasts') }
      { podcasts.map(p => <Podcast key={p.link} {...p} />) }
    </div>
  );
}
Podcasts.propTypes = {
  data: PropTypes.shape({
    allPodcast: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          podcast: Podcast.propTypes.isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query Podcasts {
    allPodcast (
      sort: {
        fields: [podcast___latestDate]
        order: DESC
      }
    ) {
      edges {
        node {
          podcast {
            description
            latestUrl
            link
            title
          }
        }
      }
    }
  }
`;
