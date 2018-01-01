import Link from 'gatsby-link';
import { css } from 'glamor';
import { columns, row } from 'glamor/ous';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import { space } from '../styles';
import typography from '../util/typography';
import favicon from './favicon.ico';
import logo from './img/logo.gif';
import logoLeft from './img/logo_left.gif';
import logoMiddle from './img/logo_middle.gif';
import logoRight from './img/logo_right.gif';
import mmLeft from './img/mm_left.gif';
import mmLeftCurve from './img/mm_left_curve.gif';
import mmMiddle from './img/mm_middle.gif';
import mmRight from './img/mm_right.gif';
import mmRightCurve from './img/mm_right_curve.gif';


function Sidebar({ children, title }) {
  return (
    <glamorous.Div
      background="#CCC"
      border="solid thin #5A79A5"
      color="#346"
      css={columns(2)}
      marginTop={typography.rhythm(-2 / 3)}
      paddingLeft={typography.rhythm(1 / 3)}
      paddingRight={typography.rhythm(1 / 3)}
      paddingTop={typography.rhythm(2 / 3)}
    >
      <h2 css={css(typography.scale(0), { margin: 0 })}>
        { title }
      </h2>
      <ul>{ children }</ul>
    </glamorous.Div>
  );
}
Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

function SidebarLink({ children, to }) {
  return <li><Link css={{ color: '#346' }} to={to}>{ children }</Link></li>;
}
SidebarLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

const writings = (
  <Sidebar title="Writings">
    <SidebarLink to="/writings/csc201-laboratory-vim/">
      CSC201 Laboratory: ViM
    </SidebarLink>
    <SidebarLink to="/writings/vim-faq/">Vim FAQ</SidebarLink>
    <SidebarLink to="/writings/programming-languages-web-developers/">
      Programming Languages for Web Developers
    </SidebarLink>
    <SidebarLink to="/writings/drupal-web-service/">
      Drupal as a Web Service
    </SidebarLink>
    <SidebarLink to="/writings/what-does-php-53-mean-drupal/">
      What Does PHP 5.3 Mean for Drupal
    </SidebarLink>
    <SidebarLink to="/writings/web-application-security-fundamentals/">
      Web Application Security Fundamentals
    </SidebarLink>
    <SidebarLink to="/writings/cryptography-and-security-coders/">
      Cryptography (and Security) for Coders
    </SidebarLink>
  </Sidebar>
);
const misc = (
  <Sidebar title="Misc">
    <SidebarLink to="/misc/books/">Books</SidebarLink>
    <SidebarLink to="/misc/podcasts/">Podcasts</SidebarLink>
  </Sidebar>
);
const cv = (
  <Sidebar title="Curriculum Vitae">
    <SidebarLink to="/">Résumé</SidebarLink>
    <SidebarLink to="/cv/work/">Work History</SidebarLink>
    <SidebarLink to="/cv/courses/">Courses</SidebarLink>
    <SidebarLink to="/cv/code-samples/">Code Samples</SidebarLink>
  </Sidebar>
);
const education = (
  <Sidebar title="Education">
    <SidebarLink to="/education/topics/">By Topic</SidebarLink>
  </Sidebar>
);

const mainMenuHeight = '50px';

function MainMenuLink({
  children,
  first,
  last,
  to,
}) {
  const pseudoEl = {
    content: ' ',
    display: 'inline-block',
    height: mainMenuHeight,
    verticalAlign: 'top',
    width: '25px',
  };
  return (
    <glamorous.Li
      css={{
        ':before': {
          ...pseudoEl,
          background: `url(${first ? mmLeftCurve : mmLeft}) no-repeat right top`,
        },
        ':after': {
          ...pseudoEl,
          background: `url(${last ? mmRightCurve : mmRight}) no-repeat left top`,
        },
      }}
      float="left"
      lineHeight={mainMenuHeight}
      listStyleType="none"
      marginLeft={first ? '10px' : null}
    >
      <Link
        css={{
          ...(typography.scale(1 / 2)),
          background: `#5A79A5 url(${mmMiddle}) repeat-x`,
          color: '#FFF',
          display: 'inline-block',
          fontVariant: 'small-caps',
          fontStyle: 'italic',
          height: mainMenuHeight,
          lineHeight: mainMenuHeight,
        }}
        to={to}
      >
        { children }
      </Link>
    </glamorous.Li>
  );
}
MainMenuLink.propTypes = {
  children: PropTypes.node.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  to: PropTypes.string.isRequired,
};
MainMenuLink.defaultProps = {
  first: false,
  last: false,
};

const headerName = (
  <glamorous.Span
    background={`url(${logoLeft}) left bottom no-repeat`}
    display="inline-block"
    fontWeight="bold"
    height="25px"
    lineHeight="25px"
    marginLeft="90px"
    marginTop="10px"
    paddingLeft="17px"
  >
    <Link
      css={{
        background: `url(${logoRight}) right bottom no-repeat`,
        display: 'inline-block',
        color: '#000',
        paddingRight: '24px',
      }}
      to="/"
    >
      <glamorous.Span
        background={`url(${logoMiddle}) repeat`}
        display="inline-block"
      >
        C.M. Lubinski
      </glamorous.Span>
    </Link>
  </glamorous.Span>
);
const mainMenu = (
  <glamorous.Ul
    display="block"
    height={mainMenuHeight}
    lineHeight={mainMenuHeight}
    marginBottom={0}
    marginLeft="80px"
    marginTop="5px"
  >
    <MainMenuLink first to="/">Curriculum Vitae</MainMenuLink>
    <MainMenuLink to="/writings/">Writings</MainMenuLink>
    <MainMenuLink last to="/misc/books/">Misc.</MainMenuLink>
  </glamorous.Ul>
);
const footer = (
  <glamorous.Div
    margin="1em 0"
    textAlign="center"
  >
    <glamorous.Span
      background="#DCDFF6"
      borderRadius="10px"
      padding="0 1em"
    >
      &copy; C.M. Lubinski 2008-2018
    </glamorous.Span>
  </glamorous.Div>
);

export default function Layout(props) {
  const { children, location } = props;
  const { pathname } = location;

  css.global('html', { fontSize: '100%' }); // fix bug in glamor/ous

  let sidebar;
  if (pathname.startsWith('/writings/')) {
    sidebar = writings;
  } else if (pathname.startsWith('/misc/')) {
    sidebar = misc;
  } else if (pathname.startsWith('/education/')) {
    sidebar = education;
  } else {
    sidebar = cv;
  }

  return (
    <div css={{ marginTop: space, paddingLeft: space, paddingRight: space }}>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <div id="header" css={row}>
        <Link css={{ position: 'absolute' }} to="/">
          <img src={logo} alt="Home" />
        </Link>
        { headerName }
        { mainMenu }
      </div>
      <div css={row}>
        { sidebar }
        <div css={columns(9)}>
          <glamorous.Div
            background="#DCDFF6"
            borderRadius="10px"
            color="#222"
            padding="0 2em 2em 2em"
          >
            { children() }
          </glamorous.Div>
          { footer }
        </div>
      </div>
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
