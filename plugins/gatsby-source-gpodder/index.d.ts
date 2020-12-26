import { GatsbyImageProps } from "gatsby-image";

export interface EpisodeNode {
  logo: null | { childImageSharp: GatsbyImageProps };
  title: string;
}

export interface PodcastNode {
  description: null | { childMarkdownRemark: { html: string } };
  logo: null | { childImageSharp: GatsbyImageProps };
  maxActivity: string;
  maxEpisode: number;
  recentEpisodes: EpisodeNode[];
  title: string;
  website: string;
}
