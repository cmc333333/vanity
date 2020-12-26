import { CSSObject } from "@emotion/serialize";
import { graphql } from "gatsby";
import * as React from "react";

import Layout, { miscSidebar } from "../../layouts";

export const query = graphql`
  {
    allGoodreads(
      filter: { book: { toRead: { eq: false } } }
      sort: { fields: [book___added], order: DESC }
    ) {
      edges {
        node {
          book {
            author
            currentlyReading
            description
            imgLg
            imgMd
            link
            published
            title
          }
        }
      }
    }
  }
`;

interface BookType {
  author: string;
  currentlyReading: boolean;
  description: string;
  imgLg: string;
  imgMd: string;
  link: string;
  published: number;
  title: string;
}
interface GQL {
  data: {
    allGoodreads: {
      edges: { node: { book: BookType } }[];
    };
  };
}

const Book: React.FC<{
  book: BookType;
  image?: string;
  imgStyle?: CSSObject;
}> = ({ book, image = "", imgStyle = {} }) => {
  const { author, description, link, published, title } = book;
  /* eslint-disable react/no-danger */
  const body = <p dangerouslySetInnerHTML={{ __html: description }} />;
  /* eslint-enable react/no-danger */
  return (
    <div style={{ clear: "both", marginBottom: "2em" }}>
      <h4>{title}</h4>
      {image ? (
        <a href={link}>
          <img alt={`${title} cover`} css={imgStyle} src={image} />
        </a>
      ) : null}
      <p>
        By {author}, {published}
      </p>
      {body}
    </div>
  );
};

const Books: React.FC<GQL> = ({ data }) => {
  const books = data.allGoodreads.edges.map((e) => e.node.book);
  return (
    <Layout sidebar={miscSidebar} title="Books">
      <h3>Currently Reading</h3>
      {books
        .filter((b) => b.currentlyReading)
        .map((b) => (
          <Book
            book={b}
            image={b.imgLg}
            imgStyle={{ float: "right", width: 200 }}
            key={b.title}
          />
        ))}
      <h3>Recently Read</h3>
      {books
        .filter((b) => !b.currentlyReading)
        .slice(0, 10)
        .map((b) => (
          <Book
            book={b}
            image={b.imgMd}
            imgStyle={{
              float: "left",
              marginBottom: ".5em",
              marginRight: "1em",
            }}
            key={b.title}
          />
        ))}
      <h3>Less Fresh</h3>
      <ul css={{ listStyle: "none" }}>
        {books
          .filter((b) => !b.currentlyReading)
          .slice(10)
          .map((b) => (
            <li key={b.title}>
              <a href={b.link}>{b.title}</a> By {b.author},{b.published}
            </li>
          ))}
      </ul>
      <hr />
      <p>
        Content from <a href="http://goodreads.com">GoodReads</a>
      </p>
    </Layout>
  );
};
export default Books;
