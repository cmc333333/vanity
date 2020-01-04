import { graphql, Link, StaticQuery } from 'gatsby';
import * as moment from 'moment';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Row } from '../components/common';
import MainMenuLink, { mainMenuHeight } from '../components/main-menu-link';
import Sidebar from '../components/sidebar';
import SidebarLink from '../components/sidebar-link';
import {
  colors,
  columns,
  hideOn,
  scaleText,
  spacing,
} from '../styles';
import * as favicon from './favicon.ico';
import * as logoLeft from './img/logo_left.gif';
import * as logoMiddle from './img/logo_middle.gif';
import * as logoRight from './img/logo_right.gif';


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
    <SidebarLink to="/misc/watching/">Watching</SidebarLink>
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
      <span css={hideOn({ medium: true })}>ificate</span>
      s
    </SidebarLink>
  </Sidebar>
);

const headerName = (
  <span
    css={{
      background: `url(${logoLeft}) left bottom no-repeat`,
      display: 'inline-block',
      fontWeight: 'bold',
      height: '25px',
      lineHeight: '25px',
      marginLeft: '90px',
      marginTop: '10px',
      paddingLeft: '17px',
    }}
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
      <span css={{ background: `url(${logoMiddle}) repeat`, display: 'inline-block' }}>
        C.M. Lubinski
      </span>
    </Link>
  </span>
);
const mainMenu = (
  <ul
    css={{
      display: 'block',
      height: mainMenuHeight,
      lineHeight: mainMenuHeight,
      marginBottom: 0,
      marginLeft: '80px',
      marginTop: '5px',
    }}
  >
    <MainMenuLink first to="/">At a Glance</MainMenuLink>
    <MainMenuLink to="/work/history/">Work</MainMenuLink>
    <MainMenuLink to="/education/topics/">Education</MainMenuLink>
    <MainMenuLink last to="/misc/books/">Misc.</MainMenuLink>
  </ul>
);

interface FooterProps {
  buildTime: string;
}
interface FooterState {
  fromNow: string;
}
class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props) {
    super(props);
    this.state = { fromNow: moment(props.buildTime).fromNow() };
  }

  componentDidMount(): void {
    const { buildTime } = this.props;
    this.setState({ fromNow: moment(buildTime).fromNow() });
  }

  render(): JSX.Element {
    const { fromNow } = this.state;
    return (
      <div css={{ margin: '1em 0', textAlign: 'center' }}>
        <span
          css={{
            background: colors.background,
            borderRadius: '10px',
            padding: '0 1em',
          }}
          title={`Built ${fromNow}`}
        >
          &copy; C.M. Lubinski 2008-2019
        </span>
      </div>
    );
  }
}
const footerFromGraphQL = (props: { site: FooterProps }): JSX.Element => {
  const { site: { buildTime } } = props;
  return <Footer buildTime={buildTime} />;
};

interface LayoutProps {
  children: React.ReactNode;
  sidebar: JSX.Element;
  title: string;
}
const Layout: React.SFC<LayoutProps> = ({ children, sidebar, title }) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: spacing(1 / 2),
      maxWidth: '1000px',
    }}
  >
    <Helmet>
      <title>{`${title} | C.M. Lubinski`}</title>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <Row id="header">
      <Link css={{ position: 'absolute' }} to="/">
        <div
          css={{
            border: `10px solid ${colors.header}`,
            borderRadius: '50%',
            height: '100px',
            width: '100px',
          }}
        >
          <div
            css={{
              ...scaleText(1),
              backgroundColor: colors.header,
              borderRadius: '10px',
              color: '#fff',
              height: '62px',
              margin: '9px',
              paddingLeft: '5px',
              width: '62px',
            }}
          >
            &gt;_
          </div>
        </div>
      </Link>
      { headerName }
      { mainMenu }
    </Row>
    <Row>
      { sidebar }
      <div css={columns({ small: 12, medium: 9 })}>
        <div
          css={{
            background: colors.background,
            borderRadius: '10px',
            color: '#222',
            padding: '0 2em 2em 2em',
          }}
        >
          <h1
            css={{
              background: colors.header,
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              color: '#FFF',
              paddingBottom: '.5rem',
              paddingTop: '.5rem',
              margin: '0 20% .5em 20%',
              textAlign: 'center',
            }}
          >
            {title}
          </h1>
          { children }
        </div>
        <StaticQuery
          query={graphql`{ site { buildTime } }`}
          render={footerFromGraphQL}
        />
      </div>
    </Row>
  </div>
);
export default Layout;
