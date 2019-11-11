import { graphql } from 'gatsby';
import Img from "gatsby-image"
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import Layout, { miscSidebar } from '../../layouts';
import styles, { colors, columns, hideOn, row, spacing } from '../../styles';

const NBSP = '\u00A0';

function PodcastEpisode({ ep }) {
  const { fields, title } = ep;
  const logo = fields && fields.logo.childImageSharp.fixed;

  if (!title) {
    return null;
  }

  if (logo) {
    return (
      <glamorous.Div css={row} marginBottom={spacing(1 / 2)} marginTop={spacing(1 / 2)}>
        <glamorous.Div boxSizing="border-box" float="left" width={`${logo.width}px`}>
          <Img fixed={logo} style={{ border: "1px solid black", maxWidth: "100%" }}/>
        </glamorous.Div>
        <glamorous.Div
          boxSizing="border-box"
          display="table"
          float="left"
          height={`${logo.height}px`}
          paddingLeft={spacing(1 / 2)}
          width={`calc(100% - ${logo.width}px)`}
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
        { recentEpisodes.map(ep => <PodcastEpisode ep={ep} />) }
        { showAllButton }
      </>
    )
  }

  render() {
    const {
      fields: {
        description: { childMarkdownRemark: { html } },
        logo,
      },
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
  fields: PropTypes.shape({
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
  }).isRequired,
  title: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  recentEpisodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Podcasts({ data }) {
  const episodes = {};
  data.allPodcastEpisode.nodes.forEach((ep) => {
    episodes[ep.url] = ep
  });
  data.allPodcast.nodes.forEach((podcast) => {
    podcast.recentEpisodes = podcast.recentEpisodes.map(epUrl => episodes[epUrl]).filter(e => e);
  });

  return (
    <Layout sidebar={miscSidebar} title="Podcasts">
      { data.allPodcast.nodes.map(p => <Podcast key={p.link} {...p} />) }
    </Layout>
  );
}
Podcasts.propTypes = {
  data: PropTypes.shape({
    allPodcast: PropTypes.shape({
      nodes: PropTypes.arrayOf(Podcast.propTypes).isRequired,
    }).isRequired,
    allPodcastEpisode: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({
        logoUrl: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })).isRequired,
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
        recentEpisodes

        fields {
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

    allPodcastEpisode {
      nodes {
        title
        url

        fields {
          logo {
            childImageSharp {
              fixed(height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
