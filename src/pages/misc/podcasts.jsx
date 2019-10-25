import { graphql } from 'gatsby';
import Img from "gatsby-image"
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../layouts';
import styles, { colors, columns, row } from '../../styles';

const NBSP = '\u00A0';

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
          <div css={columns({ small: 3 })}>
            { logo && <Img fluid={logo.childImageSharp.fluid} /> || NBSP }
          </div>
          <glamorous.Div css={columns({ small: 9 })} paddingLeft={styles.rhythm(0.5)}>
            <glamorous.H4 display="inline-block">
              <a href={website}>{ title }</a>
            </glamorous.H4>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            { this.recentTitlesEl }
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
        title
        website
        recentTitles

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
  }
`;
