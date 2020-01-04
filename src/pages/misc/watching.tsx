import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { TraktNode } from 'gatsby-source-trakt';
import * as React from 'react';

import * as tmdbLogo from '../../assets/logos/tmdb.svg';
import * as traktLogo from '../../assets/logos/trakt-wide-red-black.svg';
import * as tvdbLogo from '../../assets/logos/tvdb.png';
import { CommaDelimitedList, ContentEntry, Row } from '../../components/common';
import Layout, { miscSidebar } from '../../layouts';
import styles, {
  colors,
  columns,
  hideOn,
} from '../../styles';

const Title: React.SFC<{ traktNode: TraktNode }> = ({ traktNode }) => {
  const { homepage } = traktNode;
  let { title } = traktNode;
  if (traktNode.traktType === 'show') {
    title = `${title} (Series)`;
  }
  if (traktNode.favorite) {
    title = `★ ${title}`;
  }
  return <h4>{homepage ? <a href={homepage}>{title}</a> : title}</h4>;
};

const Genres: React.SFC<{ traktNode: TraktNode }> = ({ traktNode }) => {
  const { genres } = traktNode;
  if (genres.length === 0) {
    return null;
  }
  return <CommaDelimitedList>{genres.map((g) => <li>{g}</li>)}</CommaDelimitedList>;
};

const FullEntry: React.SFC<{ traktNode: TraktNode }> = ({ traktNode }) => {
  const {
    certification,
    overview,
    poster,
    tagline,
    trailer,
  } = traktNode;

  return (
    <Row>
      <div
        css={[
          columns({ medium: 3 }),
          hideOn({ small: true }),
          { border: `1px solid ${colors.bodyText}` },
        ]}
      >
        <Img fluid={poster.childImageSharp.fluid} />
      </div>
      <div css={{ ...columns({ small: 12, medium: 9 }), paddingLeft: styles.rhythm(0.5) }}>
        <Title traktNode={traktNode} />
        {tagline && <h5>{tagline}</h5>}
        <p>{overview}</p>
        <Genres traktNode={traktNode} />
        {trailer ? <a href={trailer}>Watch Trailer</a> : null}
        {' ('}
        {certification || 'NR'}
        )
      </div>
    </Row>
  );
};

const MinimalEntry: React.SFC<{ traktNode: TraktNode }> = ({ traktNode }) => (
  <div css={{ paddingLeft: styles.rhythm(0.5) }}>
    <Title traktNode={traktNode} />
    <Genres traktNode={traktNode} />
  </div>
);

const WatchEntry: React.SFC<{ traktNode: TraktNode }> = ({ traktNode }) => (
  <ContentEntry>
    {
      traktNode.poster
        ? <FullEntry traktNode={traktNode} />
        : <MinimalEntry traktNode={traktNode} />
    }
  </ContentEntry>
);

const Watching: React.SFC<{ data: { allTrakt: { nodes: Array<TraktNode> } } }> = ({ data }) => (
  <Layout sidebar={miscSidebar} title="Watching">
    <Row>
      <div css={{ ...columns({ small: 12, medium: 9 }) }}>
        <p>
          Descriptions, rating information, and categories are sourced from
          {' '}
          <a href="https://trakt.tv">Trakt</a>
          , which also houses my personal viewing data. Film and television
          posters are provided by
          {' '}
          <CommaDelimitedList conjunction="and " inline>
            <li><a href="https://fanart.tv">FanArt.TV</a></li>
            <li><a href="https://www.themoviedb.org">The Movie DB</a></li>
            <li><a href="https://thetvdb.com">TheTVDB.com</a></li>
            <li><a href="https://www.omdbapi.com">The Open Movie Database</a></li>
          </CommaDelimitedList>
          .
        </p>
        <p>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb. TV information and images are provided by TheTVDB.com, but we
          are not endorsed or certified by TheTVDB.com or its affiliates.
        </p>
      </div>
      <div css={{ ...columns({ small: 12, medium: 3 }), paddingLeft: styles.rhythm(0.5) }}>
        <a href="https://trakt.tv"><img alt="Trakt" src={traktLogo} /></a>
        <br />
        <a href="https://www.themoviedb.org"><img alt="TheMovieDB" src={tmdbLogo} /></a>
        <br />
        <a href="https://thetvdb.com"><img alt="TheTVDB" src={tvdbLogo} /></a>
      </div>
    </Row>
    <hr />
    { data.allTrakt.nodes.map((t) => <WatchEntry traktNode={t} />) }
  </Layout>
);

export default Watching;

export const query = graphql`
  {
    allTrakt(sort: { fields: watchedAt, order: DESC }) {
      nodes {
        certification
        favorite
        genres
        homepage
        overview
        tagline
        title
        trailer
        traktType

        poster {
          childImageSharp {
            fluid(srcSetBreakpoints: [100, 200, 400, 600, 800]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
