import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Layout, { miscSidebar } from '../../layouts';


function Book({ book, image, imgStyle }) {
  /* eslint-disable react/no-danger */
  const body = <p dangerouslySetInnerHTML={{ __html: book.description }} />;
  /* eslint-enable react/no-danger */
  return (
    <div style={{ clear: 'both', marginBottom: '2em' }}>
      <h4>{ book.title }</h4>
      { image ? (
        <a href={book.link}>
          <img alt={`${book.title} cover`} src={image} style={imgStyle} />
        </a>
        ) : null }
      <p>By {book.author}, {book.published}</p>
      { body }
    </div>
  );
}
Book.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string,
  imgStyle: PropTypes.shape({}),
};
Book.defaultProps = {
  image: '',
  imgStyle: {},
};

export default function Books({ data }) {
  const books = data.allGoodreads.edges.map(e => e.node.book);
  return (
    <Layout sidebar={miscSidebar} title="Books">
      <h3>Currently Reading</h3>
      { books.filter(b => b.currentlyReading).map(b => (
        <Book
          book={b}
          image={b.imgLg}
          imgStyle={{ float: 'right', width: 200 }}
        />))
      }
      <h3>Recently Read</h3>
      { books.filter(b => !b.currentlyReading).slice(0, 10).map(b => (
        <Book
          book={b}
          image={b.imgMd}
          imgStyle={{ float: 'left', marginBottom: '.5em', marginRight: '1em' }}
        />))
      }
      <h3>Less Fresh</h3>
      <ul css={{ listStyle: 'none' }}>
        { books.filter(b => !b.currentlyReading).slice(10).map(b => (
          <li>
            <a href={b.link}>{b.title}</a>{' '}
            By {b.author},{b.published}
          </li>))
        }
      </ul>
      <hr />
      <p>
        Content from{' '}
        <a href="http://goodreads.com">GoodReads</a>
      </p>
    </Layout>
  );
}
Books.propTypes = {
  data: PropTypes.shape({
    allGoodreads: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          book: PropTypes.shape({
            author: PropTypes.string.isRequired,
            currentlyReading: PropTypes.bool.isRequired,
            description: PropTypes.string.isRequired,
            imgLg: PropTypes.string.isRequired,
            imgMd: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            published: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};


export const query = graphql`
  {
    allGoodreads (
      filter: {
        book: {
          toRead: { eq: false }
        }
      }
      sort: {
        fields: [book___added]
        order: DESC
      }
    ) {
      edges {
        node{
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
