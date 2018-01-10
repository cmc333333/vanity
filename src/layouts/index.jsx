import Link from 'gatsby-link';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import MainMenuLink, { mainMenuHeight } from '../components/main-menu-link';
import Sidebar from '../components/sidebar';
import SidebarLink from '../components/sidebar-link';
import { columns, hideOn, row, space } from '../styles';
import favicon from './favicon.ico';
import logo from './img/logo.gif';
import logoLeft from './img/logo_left.gif';
import logoMiddle from './img/logo_middle.gif';
import logoRight from './img/logo_right.gif';


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
    <SidebarLink to="/cv/code-samples/">Code Samples</SidebarLink>
  </Sidebar>
);
const education = (
  <Sidebar title="Education">
    <SidebarLink to="/education/topics/">By Topic</SidebarLink>
    <SidebarLink to="/education/degrees/">
      Degrees &amp; Cert
      <span css={hideOn({ medium: true })}>ificate</span>s
    </SidebarLink>
  </Sidebar>
);

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
    <MainMenuLink to="/education/topics/">Education</MainMenuLink>
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
        <div css={columns({ small: 12, medium: 9 })}>
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
