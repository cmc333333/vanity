import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { EpisodeNode, PodcastNode } from 'gatsby-source-gpodder';
import * as React from 'react';

import { ContentEntry, Row } from '../../components/common';
import Layout, { miscSidebar } from '../../layouts';
import styles, {
  colors,
  columns,
  hideOn,
  row,
  spacing,
} from '../../styles';

const NBSP = '\u00A0';

const PodcastEpisode: React.SFC<{ episode: EpisodeNode }> = ({ episode }) => {
  const { logo, title } = episode;
  let logoData = logo && logo.childImageSharp && logo.childImageSharp.fixed;
  if (Array.isArray(logoData)) {
    [logoData] = logoData;
  }

  if (!title) {
    return null;
  }

  if (logo) {
    return (
      <div css={{ ...row, marginBottom: spacing(1 / 2), marginTop: spacing(1 / 2) }}>
        <div css={{ boxSizing: 'border-box', float: 'left', width: `${logoData.width}px` }}>
          <Img fixed={logoData} style={{ border: '1px solid black', maxWidth: '100%' }} />
        </div>
        <div
          css={{
            boxSizing: 'border-box',
            display: 'table',
            float: 'left',
            height: `${logoData.height}px`,
            paddingLeft: spacing(1 / 2),
            width: `calc(100% - ${logoData.width}px)`,
          }}
        >
          <span css={{ display: 'table-cell', verticalAlign: 'middle' }}>
            { title }
          </span>
        </div>
      </div>
    );
  }
  return (
    <div css={{ marginBottom: spacing(1 / 2), marginTop: spacing(1 / 2) }}>
      {'• '}
      { title }
    </div>
  );
};

class Podcast extends React.Component<{ podcast: PodcastNode }, { showAll: boolean }> {
  constructor(props) {
    super(props);
    this.state = { showAll: true };
  }

  componentDidMount(): void {
    this.setState({ showAll: false });
  }

  get recentEpisodesEl(): JSX.Element {
    let { podcast: { recentEpisodes } } = this.props;
    const { showAll } = this.state;
    let showAllButton = null;
    if (recentEpisodes.length > 5 && !showAll) {
      recentEpisodes = recentEpisodes.slice(0, 5);
      showAllButton = (
        <button
          type="button"
          onClick={(): void => this.setState({ showAll: true })}
          css={{
            background: 'transparent',
            border: 'none',
            color: colors.link,
            cursor: 'pointer',
          }}
        >
          Show all
        </button>
      );
    }
    return (
      <>
        { recentEpisodes.map((ep) => <PodcastEpisode key={ep.title} episode={ep} />) }
        { showAllButton }
      </>
    );
  }

  render(): JSX.Element {
    const {
      podcast: {
        description: { childMarkdownRemark: { html } },
        logo,
        title,
        website,
      },
    } = this.props;
    const img = logo && logo.childImageSharp && logo.childImageSharp.fluid;
    return (
      <ContentEntry>
        <Row>
          <div
            css={[
              columns({ medium: 3 }),
              hideOn({ small: true }),
              { border: img && `1px solid ${colors.bodyText}` },
            ]}
          >
            { (img && <Img fluid={img} />) || NBSP }
          </div>
          <div css={{ ...columns({ small: 12, medium: 9 }), paddingLeft: styles.rhythm(0.5) }}>
            <h4 css={{ display: 'inline-block' }}>
              <a href={website}>{ title }</a>
            </h4>
            <div
              css={{
                ...hideOn({ medium: true, large: true }),
                border: img && `1px solid ${colors.bodyText}`,
                margin: `${styles.rhythm(0.5)} 20%`,
              }}
            >
              { (img && <Img fluid={img} />) || NBSP }
            </div>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: html }} />
            { this.recentEpisodesEl }
          </div>
        </Row>
      </ContentEntry>
    );
  }
}

interface PodcastsProps {
  data: {
    allPodcast: {
      nodes: PodcastNode[];
    };
  };
}
const Podcasts: React.SFC<PodcastsProps> = ({ data: { allPodcast: { nodes } } }) => (
  <Layout sidebar={miscSidebar} title="Podcasts">
    <p>
      I listen to a lot of podcasts. They&rsquo;re perfect for multi-tasking:
      learn unexpected factoids and hear analysis of world events while
      doing the dishes, running errands, or exercising. In fact, I enjoy
      so many of them that I need to speed up their playback (currently: 3.2
      times) just to keep up with their release schedules!
    </p>
    <p>
      {'One of the interesting features of my podcatcher of choice, '}
      <a href="https://antennapod.org/">AntennaPod</a>
      {', is the ability to record listening habits through '}
      <a href="https://gpodder.net/">gPodder.net</a>
      . This page uses data from the latter&rsquo;s API to display not only
      my current subscriptions, but also some expanded episode information
      for pieces I&rsquo;ve listened to in the last week. See the
      {' '}
      <a
        href="https://github.com/cmc333333/vanity/tree/master/plugins/gatsby-source-gpodder"
      >
        source code
      </a>
      {' for details.'}
    </p>
    <hr />
    { nodes.map((p) => <Podcast key={p.website} podcast={p} />) }
  </Layout>
);
export default Podcasts;

export const query = graphql`
  {
    allPodcast(
      sort: {
        fields: [maxActivity, maxEpisode, title],
          order: [DESC, DESC, ASC]
      },
    ) {
      nodes {
        title
        website

        recentEpisodes {
          title

          logo {
            childImageSharp {
              fixed(height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }

        description {
          childMarkdownRemark {
            html
          }
        }

        logo {
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
