import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import './bootstrap.min.css';
import './bootstrap-responsive.min.css';
import './page.css';
import favicon from './favicon.ico';
import logo from './img/logo.gif';

function Writings() {
  return (
    <div>
      <h2 className="title">Writings</h2>
      <ul className="menu">
        <li>
          <Link to="/writings/csc201-laboratory-vim/">
            CSC201 Laboratory: ViM
          </Link>
        </li>
        <li>
          <Link to="/writings/vim-faq/">Vim FAQ</Link>
        </li>
        <li>
          <Link to="/writings/programming-languages-web-developers/">
            Programming Languages for Web Developers
          </Link>
        </li>
        <li>
          <Link to="/writings/drupal-web-service/">
            Drupal as a Web Service
          </Link>
        </li>
        <li>
          <Link to="/writings/what-does-php-53-mean-drupal/">
            What Does PHP 5.3 Mean for Drupal
          </Link>
        </li>
        <li>
          <Link to="/writings/web-application-security-fundamentals/">
            Web Application Security Fundamentals
          </Link>
        </li>
        <li>
          <Link to="/writings/cryptography-and-security-coders/">
            Cryptography (and Security) for Coders
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Misc() {
  return (
    <div>
      <h2 className="title">Misc</h2>
      <ul className="menu">
        <li><Link to="/misc/books/">Books</Link></li>
        <li><Link to="/misc/podcasts/">Podcasts</Link></li>
      </ul>
    </div>
  );
}

function CV() {
  return (
    <div>
      <h2 className="title">Curriculum Vitae</h2>
      <ul className="menu">
        <li><Link to="/">Résumé</Link></li>
        <li><Link to="/cv/work/">Work History</Link></li>
        <li><Link to="/cv/courses/">Courses</Link></li>
        <li><Link to="/cv/code-samples/">Code Samples</Link></li>
      </ul>
    </div>
  );
}

export default function Layout(props) {
  const { children, location } = props;
  const { pathname } = location;
  let menu;
  if (pathname.startsWith('/writings/')) {
    menu = <Writings />;
  } else if (pathname.startsWith('/misc/')) {
    menu = <Misc />;
  } else {
    menu = <CV />;
  }

  return (
    <div className="container-fluid">
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <div id="header" className="row-fluid">
        <Link id="logo" to="/">
          <img src={logo} alt="Home" />
        </Link>
        <strong>
          <Link to="/">
            <span>C.M. Lubinski</span>
          </Link>
        </strong>
        <ul id="main-menu">
          <li className="first">
            <Link to="/">Curriculum Vitae</Link>
          </li>
          <li>
            <Link to="/writings/">Writings</Link>
          </li>
          <li className="last">
            <Link to="/misc/books/">Misc.</Link>
          </li>
        </ul>
      </div>
      <div className="row-fluid">
        <div id="sidebar" className="span2">
          { menu }
        </div>
        <div id="main" className="span9">
          { children() }
        </div>
      </div>
      <div id="footer" className="row-fluid">
        <div className="span9 offset2">
          <span>&copy; C.M. Lubinski 2008-2017</span>
        </div>
      </div>
      <script type="text/javascript">
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-87597611-1', 'auto');
          ga('send', 'pageview');
        `}
      </script>
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
