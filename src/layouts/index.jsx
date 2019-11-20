import { graphql, Link, StaticQuery } from 'gatsby';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import MainMenuLink, { mainMenuHeight } from '../components/main-menu-link';
import Sidebar from '../components/sidebar';
import SidebarLink from '../components/sidebar-link';
import { colors, columns, hideOn, row, scaleText, spacing } from '../styles';
import favicon from './favicon.ico';
import logoLeft from './img/logo_left.gif';
import logoMiddle from './img/logo_middle.gif';
import logoRight from './img/logo_right.gif';


export const writingsSidebar = (
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
export const miscSidebar = (
  <Sidebar title="Misc">
    <SidebarLink to="/writings/">Writings</SidebarLink>
    <SidebarLink to="/misc/books/">Books</SidebarLink>
    <SidebarLink to="/misc/podcasts/">Podcasts</SidebarLink>
  </Sidebar>
);
export const cvSidebar = (
  <Sidebar title="At a Glance">
    <SidebarLink to="/">Résumé</SidebarLink>
  </Sidebar>
);
export const workSidebar = (
  <Sidebar title="Work">
    <SidebarLink to="/work/history/">History</SidebarLink>
  </Sidebar>
);
export const educationSidebar = (
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
    <MainMenuLink first to="/">At a Glance</MainMenuLink>
    <MainMenuLink to="/work/history/">Work</MainMenuLink>
    <MainMenuLink to="/education/topics/">Education</MainMenuLink>
    <MainMenuLink last to="/misc/books/">Misc.</MainMenuLink>
  </glamorous.Ul>
);
const Footer = ({ buildTimeHoursAgo }) => (
  <glamorous.Div
    margin="1em 0"
    textAlign="center"
  >
    <glamorous.Span
      background={colors.background}
      borderRadius="10px"
      padding="0 1em"
      title={`Built ${buildTimeHoursAgo} hours ago`}
    >
      &copy; C.M. Lubinski 2008-2019
    </glamorous.Span>
  </glamorous.Div>
);
Footer.propTypes = { buildTimeHoursAgo: PropTypes.string.isRequired };

export default function Layout({ children, sidebar, title }) {
  return (
    <glamorous.Div
      marginLeft="auto"
      marginRight="auto"
      marginTop={spacing(1 / 2)}
      maxWidth="1000px"
    >
      <Helmet>
        <title>{`${title} | C.M. Lubinski`}</title>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <div id="header" css={row}>
        <Link css={{ position: 'absolute' }} to="/">
          <glamorous.Div
            border={`10px solid ${colors.header}`}
            borderRadius="50%"
            height="100px"
            width="100px"
          >
            <glamorous.Div
              backgroundColor={colors.header}
              borderRadius="10px"
              color="#fff"
              css={scaleText(1)}
              height="62px"
              margin="9px"
              paddingLeft="5px"
              width="62px"
            >
              &gt;_
            </glamorous.Div>
          </glamorous.Div>
        </Link>
        { headerName }
        { mainMenu }
      </div>
      <div css={row}>
        { sidebar }
        <div css={columns({ small: 12, medium: 9 })}>
          <glamorous.Div
            background={colors.background}
            borderRadius="10px"
            color="#222"
            padding="0 2em 2em 2em"
          >
            <glamorous.H1
              background={colors.header}
              borderBottomLeftRadius="20px"
              borderBottomRightRadius="20px"
              color="#FFF"
              paddingBottom=".5rem"
              paddingTop=".5rem"
              margin="0 20% .5em 20%"
              textAlign="center"
            >
              {title}
            </glamorous.H1>
            { children }
          </glamorous.Div>
          <StaticQuery
            query={graphql`{ site { buildTimeHoursAgo: buildTime(difference: "hours") } }`}
            render={data => <Footer {...data.site} />}
          />
        </div>
      </div>
    </glamorous.Div>
  );
}
Layout.propTypes = {
  children: PropTypes.func.isRequired,
  sidebar: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};
