import { GatsbyImageProps } from "gatsby-image";

export interface PosterImage {
  childImageSharp: GatsbyImageProps;
}

export interface TraktNode {
  certification: string | null;
  favorite: boolean;
  genres: Array<string>;
  homepage: string | null;
  overview: string;
  poster: PosterImage | null;
  tagline: string | null;
  title: string;
  trailer: string | null;
  traktType: "movie" | "show";
  watchedAt: string;
}
