import { graphql } from 'gatsby';
import Img from "gatsby-image"
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import Layout, { miscSidebar } from '../../layouts';
import styles, { colors, columns, hideOn, row, spacing } from '../../styles';

const NBSP = '\u00A0';

function PodcastEpisode({ logo, title }) {
  const logoData = logo && logo.childImageSharp.fixed;

  if (!title) {
    return null;
  }

  if (logo) {
    return (
      <glamorous.Div css={row} marginBottom={spacing(1 / 2)} marginTop={spacing(1 / 2)}>
        <glamorous.Div boxSizing="border-box" float="left" width={`${logoData.width}px`}>
          <Img fixed={logoData} style={{ border: "1px solid black", maxWidth: "100%" }}/>
        </glamorous.Div>
        <glamorous.Div
          boxSizing="border-box"
          display="table"
          float="left"
          height={`${logoData.height}px`}
          paddingLeft={spacing(1 / 2)}
          width={`calc(100% - ${logoData.width}px)`}
        >
          <glamorous.Span display="table-cell" verticalAlign="middle">
            { title }
          </glamorous.Span>
        </glamorous.Div>
      </glamorous.Div>
    );
  } else {
    return (
      <glamorous.Div marginBottom={spacing(1 / 2)} marginTop={spacing(1 / 2)}>• { title }</glamorous.Div>
    );
  }
}

class Podcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAll: true };
  }

  componentDidMount() {
    this.setState({ showAll: false });
  }

  get recentEpisodesEl() {
    let { recentEpisodes } = this.props;
    let showAllButton = null;
    if (recentEpisodes.length > 5 && !this.state.showAll) {
      recentEpisodes = recentEpisodes.slice(0, 5);
      showAllButton = (
        <glamorous.Button
          onClick={() => this.setState({ showAll: true })}
          background="transparent"
          border="none"
          color={colors.link}
          cursor="pointer"
        >
          Show all
        </glamorous.Button>
      );
    }
    return (
      <>
        { recentEpisodes.map(ep => <PodcastEpisode key={ep.title} {...ep} />) }
        { showAllButton }
      </>
    )
  }

  render() {
    const {
      description: { childMarkdownRemark: { html } },
      logo,
      title,
      website,
    } = this.props;
    return (
      <glamorous.Div
        borderBottomColor={colors.bodyText}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        marginBottom={styles.rhythm(0.5)}
        paddingBottom={styles.rhythm(0.5)}
      >
        <div css={row}>
          <glamorous.Div
            border={logo && `1px solid ${colors.bodyText}`}
            {...columns({ medium: 3 })}
            {...hideOn({ small: true })}
          >
            { logo && <Img fluid={logo.childImageSharp.fluid} /> || NBSP }
          </glamorous.Div>
          <glamorous.Div css={columns({ small: 12, medium: 9 })} paddingLeft={styles.rhythm(0.5)}>
            <glamorous.H4 display="inline-block">
              <a href={website}>{ title }</a>
            </glamorous.H4>
            <glamorous.Div
              border={logo && `1px solid ${colors.bodyText}`}
              css={hideOn({ medium: true, large: true })}
              margin={`${styles.rhythm(0.5)} 20%`}
            >
              { logo && <Img fluid={logo.childImageSharp.fluid} /> || NBSP }
            </glamorous.Div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            { this.recentEpisodesEl }
          </glamorous.Div>
        </div>
      </glamorous.Div>
    );
  }
}
Podcast.propTypes = {
  description: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }),
  }).isRequired,
  logo: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
  recentEpisodes: PropTypes.arrayOf(PropTypes.shape({
    logo: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.any.isRequired,
      }).isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

export default function Podcasts({ data }) {
  return (
    <Layout sidebar={miscSidebar} title="Podcasts">
      <p>
        I listen to a lot of podcasts. They're perfect for multi-tasking:
        learn unexpected factoids and hear analysis of world events while
        doing the dishes, running errands, or exercising. In fact, I enjoy
        so many of them that I need to speed up their playback (currently: 3.2
        times) just to keep up with their release schedules!
      </p>
      <p>
        One of the interesting features of my podcatcher of choice,
        {' '}
        <a href="https://antennapod.org/">AntennaPod</a>, is the ability to
        record listening habits through
        {' '}
        <a href="https://gpodder.net/">gPodder.net</a>. This page uses data
        from the latter's API to display not only my current subscriptions,
        but also some expanded episode information for pieces I've listened to
        in the last week. See the
        {' '}
        <a
          href="https://github.com/cmc333333/vanity/tree/master/plugins/gatsby-source-gpodder"
        >
          source code
        </a> for details.
      </p>
      <hr />
      { data.allPodcast.nodes.map(p => <Podcast key={p.website} {...p} />) }
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
