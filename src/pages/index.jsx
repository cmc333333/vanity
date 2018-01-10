import Link from 'gatsby-link';
import { css } from 'glamor';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import resume from '../assets/lubinski-resume.pdf';
import { columns, row } from '../styles';
import setPageTitle from '../util/set-page-title';
import typography from '../util/typography';

const email = 'cm.lubinski@gmail.com';

const BorderedRow = glamorous.section(row, { borderBottom: '1px solid #000' });
const ThirdCol = glamorous.section(columns({ small: 12, medium: 6, large: 4 }));
const HalfCol = glamorous.section(columns({ small: 12, medium: 6 }));
const LeftCol = glamorous(HalfCol)({
  borderRight: '1px solid #000',
  paddingRight: typography.rhythm(2 / 3),
});
const RightCol = glamorous(HalfCol)({ paddingLeft: typography.rhythm(2 / 3) });
const MarkerlessList = glamorous.ul({ listStyleType: 'none' });
const FlushList = glamorous(MarkerlessList)({ marginLeft: 0 });
const SectionHeader = glamorous.h4({ '::after': { content: ':' } });
const SubSectionHeader = glamorous.h5(
  { fontWeight: 'normal', textDecoration: 'underline' },
  typography.scale(0),
);
const subSubHeaderCss = css(
  { display: 'inline', fontStyle: 'italic', fontWeight: 'normal' },
  typography.scale(0),
);
const SubSubHeader = glamorous.h6(subSubHeaderCss);
const FloatRight = glamorous.span({ float: 'right' });

function PridePoint({ children, title }) {
  return (
    <div>
      <glamorous.H5 {...subSubHeaderCss}>{ title }</glamorous.H5>{' '}
      <glamorous.P
        display="inline-block"
        marginBottom={typography.rhythm(2 / 3)}
      >
        { children }
      </glamorous.P>
    </div>
  );
}
PridePoint.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default function Index() {
  return (
    <div>
      { setPageTitle('Résumé') }
      <div css={css(row, { marginBottom: '1rem' })}>
        <HalfCol><a href={resume}>PDF Version</a></HalfCol>
        <HalfCol css={{ textAlign: 'right' }}>
          <a href="https://docs.google.com/document/d/1OYoK67HSMKl9KwzWvLc2TGmsAZVGkwB2U3mm4GHsmu0/edit">
            Google Drive Version
          </a>
        </HalfCol>
      </div>
      <div id="resume">
        <BorderedRow css={{ textAlign: 'center' }}>
          <LeftCol>
            <h2>C.M. Lubinski</h2>
            <glamorous.H3
              css={typography.scale(1 / 5)}
              fontStyle="italic"
              fontWeight="normal"
            >
              Humble Hacker
            </glamorous.H3>
          </LeftCol>
          <RightCol>
            <glamorous.P
              marginBottom={typography.rhythm(2 / 3)}
              marginTop={typography.rhythm(2 / 3)}
            >
              <a href={`mailto:${email}`}>{ email }</a>
              &ndash; 872.333.9262
              <br />
              Pittsburgh, PA 15203
              <br />
              <a href="http://cmlubinski.info">http://cmlubinski.info</a>
            </glamorous.P>
          </RightCol>
        </BorderedRow>
        <SectionHeader>Relevant Skills &amp; Interests</SectionHeader>
        <BorderedRow>
          <ThirdCol>
            <SubSectionHeader>Web Development</SubSectionHeader>
            <MarkerlessList>
              <li>Model-View-Controller</li>
              <li>Static Site Generators &amp; Caching</li>
              <li>Content Management Systems</li>
            </MarkerlessList>
            <SubSectionHeader>APIs &amp; Data</SubSectionHeader>
            <MarkerlessList>
              <li>RESTful clients &amp; services</li>
              <li>Relational &amp; Document DBs</li>
              <li>Search Indexes, Key-Value Stores</li>
            </MarkerlessList>
          </ThirdCol>
          <ThirdCol>
            <SubSectionHeader>Natural Language Processing</SubSectionHeader>
            <MarkerlessList>
              <li>Parsing &amp; Formal Grammars</li>
              <li>Search &amp; Information Retrieval</li>
              <li>Machine &amp; Statistical Learning</li>
            </MarkerlessList>
            <SubSectionHeader>Geospatial/GIS</SubSectionHeader>
            <MarkerlessList>
              <li>Slippy Maps, Interactive Displays</li>
              <li>Geo-aware DBs, Frameworks</li>
              <li>Importing Data (Census/ACS)</li>
            </MarkerlessList>
          </ThirdCol>
          <ThirdCol>
            <SubSectionHeader>Rapid, Stable Delivery</SubSectionHeader>
            <MarkerlessList>
              <li>Cloud infrastructure/deployments</li>
              <li>Unit Tests, Continuous Integrat&rsquo;n</li>
              <li>Release Early, Always Shipping</li>
            </MarkerlessList>
            <SubSectionHeader>Teamwork</SubSectionHeader>
            <MarkerlessList>
              <li>Agile, Open Source Development</li>
              <li>Tight-knit Peers, Always Learning</li>
              <li>Code Review via Pull Request</li>
            </MarkerlessList>
          </ThirdCol>
        </BorderedRow>
        <BorderedRow>
          <SectionHeader>
            <Link to="/cv/work">Recent Work History</Link>
          </SectionHeader>
          <SubSectionHeader>
            Innovation Specialist &mdash;{' '}
            <a href="https://18f.gsa.gov/">
              18F (General Services Administration)
            </a>
            <FloatRight>Sept &lsquo;14 &ndash; Present</FloatRight>
          </SubSectionHeader>
          <FlushList>
            <li>
              <SubSubHeader>
                <a href="https://github.com/18f/C2">Communicart</a>
              </SubSubHeader>{' '}
              Web &amp; email-based approval tracking. Ruby, Rails, Postgres,
              Cloud Foundry
            </li>
            <li>
              <SubSubHeader>
                <a href="https://github.com/18f/peacrcorps-site">
                  Peace Corps Donations
                </a>
              </SubSubHeader>{' '}
              CMS &amp; payment collection. Python, Django, Postgres, JS &amp;
              Grunt, SASS, AWS
            </li>
          </FlushList>
          <ul>
            <li>
              Helped navigate waterfall-only clients, agile developers, &amp;
              research-oriented designers to project launches
            </li>
            <li>
              Researched, implemented, and expanded libraries for
              authorization, file uploads, caching, etc.
            </li>
            <li>
              Developed key features, e.g. payments, accounting sync, data
              encryption, &amp; complexity-reducing refactors
            </li>
            <li>
              Interviewed candidates for technical work in the federal
              government; helped found 18F&rsquo;s Chicago office
            </li>
            <li>
              Shared code commentary, architecture analyses, post mortems, and
              hotfixes with peers around the country
            </li>
          </ul>
          <SubSectionHeader>
            Backend Developer &mdash;{' '}
            <a href="http://consumerfinance.gov/">
              Consumer Financial Protection Bureau
            </a>
            <FloatRight>Dec &lsquo;12 &ndash; Sep &lsquo;14</FloatRight>
          </SubSectionHeader>
          <FlushList>
            <li>
              <SubSubHeader>
                <a href="https://github.com/cfpb/mapusaurus">Mapusaurus</a>
              </SubSubHeader>{' '}
              Slippy-map highlighting red-lining cases. Python, GeoDjango,
              PostGIS, Leaflet, Topo JSON
            </li>
            <li>
              <SubSubHeader>
                <a href="https://github.com/cfpb/eregulations">
                  eRegulations
                </a>
              </SubSubHeader>{' '}
              Regulation parser, compiler, and viewer. Python, Django, MySQL,
              Solr, Backbone
            </li>
          </FlushList>
          <ul>
            <li>
              Discovered structure, definitions, citations, &amp; other data
              in messy XML; used to compile reg versions
            </li>
            <li>
              Combined and rendered census shapes and statistics with HMDA
              load records onto a slippy-map
            </li>
            <li>
              Served w/ a brilliant team; per-pull-request reviews; led the
              bureau in tests &amp; CI; frequent design critiques
            </li>
            <li>
              Co-chaired Transparency group (1st tech article), heavily
              involved in Open Source (CFPB&rsquo;s top committer)
            </li>
          </ul>
          <SubSectionHeader>
            Chief Developer &mdash;{' '}
            <a href="http://toodalu.com/">Toodalu, LLC (acquired)</a>
            <FloatRight>Aug &lsquo;10 &ndash; Dec &lsquo;12</FloatRight>
          </SubSectionHeader>
          <FlushList>
            <li>
              <SubSubHeader>APIs</SubSubHeader>{' '}
              Securely stored &amp; served data; core business logic. Scala,
              Lift, REST, JSON, PostGIS, Mongo, Solr
            </li>
            <li>
              <SubSubHeader>Web UIs</SubSubHeader>{' '}
              Corresponding user, merchant, sales, &amp; admin apps. Scala,
              Lift, Wordpress
            </li>
          </FlushList>
          <ul>
            <li>
              Led the majority of technology decisions, refactoring the code
              base through numerous, radical pivots
            </li>
            <li>
              Integrated third parties, such as credit card processors, cloud
              hosting, social networks, &amp; push notifications
            </li>
            <li>
              Configured, maintained all associated servers, including
              continuous integration with black-box Python tests
            </li>
          </ul>
          <SubSectionHeader>
            Web Developer &mdash;{' '}
            <a href="http://networkninja.com/">Network Ninja, Inc.</a>
            <FloatRight>Jun &lsquo;08 &ndash; Aug &lsquo;10</FloatRight>
          </SubSectionHeader>
          <FlushList>
            <li>
              <SubSubHeader>Legal Server</SubSubHeader>{' '}
              Client/document tracking for pro bono attorneys. Object-oriented
              PHP, Postgres
            </li>
          </FlushList>
          <ul>
            <li>
              Coordinated with project managers, kept accurate time estimates;
              improved and extended, pushing weekly
            </li>
            <li>
              Implemented unit-testing regime, preventing countless bugs;
              migrated to Trac from a custom ticket system
            </li>
          </ul>
        </BorderedRow>
        <BorderedRow>
          <LeftCol>
            <SectionHeader>Formal Education</SectionHeader>
            <SubSectionHeader>
              DePaul University
              <FloatRight>Chicago, IL</FloatRight>
            </SubSectionHeader>
            <MarkerlessList>
              <li>
                MS, Computer Science (Theory), 2014{' '}
                <FloatRight>GPA 4.00</FloatRight>
              </li>
              <li>
                &ldquo;
                <a href="http://cmc333333.github.io/forensics-thesis-code/formalized-forensics.pdf">
                  Formalized Forensics
                </a>
                &rdquo;: Master&rsquo;s Thesis
              </li>
            </MarkerlessList>
            <SubSectionHeader>
              Grinnell College
              <FloatRight>Grinnell, IA</FloatRight>
            </SubSectionHeader>
            <MarkerlessList>
              <li>
                BA, Computer Science (Honors), 2008{' '}
                <FloatRight>GPA 3.69</FloatRight>
              </li>
              <li>
                Dean&rsquo;s List, Honors Scholarship,{' '}
                <a href="http://www.siguccs.org/Conference/Fall2007/awards_winners.php">
                  ACM award
                </a>,
                TA
              </li>
            </MarkerlessList>
          </LeftCol>
          <RightCol>
            <SectionHeader>Continued Education</SectionHeader>
            <SubSectionHeader>
              Online Courses
              <FloatRight>(Coursera, Udacity, edX, Stanford, etc.)</FloatRight>
            </SubSectionHeader>
            <MarkerlessList>
              <li>AI, Bioinformatics, Crypto, Data Sci, Discrete Opt,</li>
              <li>Formal Logic, ML, Network Analysis, NLP, &amp; more</li>
            </MarkerlessList>
            <SubSectionHeader>
              Informal
              <FloatRight>(Conferences, Meetups, etc.)</FloatRight>
            </SubSectionHeader>
            <MarkerlessList>
              <li>Strange Loop, OSCON, Lambda Jam, Philly ETE</li>
              <li>
                Self-study:{' '}
                <Link to="/misc/books">books</Link>,{' '}
                <Link to="/misc/podcasts">podcasts</Link>,
                and a tendency to tinker
              </li>
            </MarkerlessList>
          </RightCol>
        </BorderedRow>
        <section>
          <SectionHeader>Other Points of Pride</SectionHeader>
          <PridePoint title="Presentations">
            about{' '}
            <Link to="/writings/cryptography-and-security-for-coders">
              security
            </Link>,{' '}
            <a href="https://docs.google.com/presentation/d/12SL5zFNW8N7Hta3hvuXd49N0IvQWq6nvb5C0CMNZVpY/edit?usp=sharing">
              static sites
            </a>,
            team morale, and more at conferences, meetups, &amp; work
          </PridePoint>
          <PridePoint title="Articles">
            ranging from{' '}
            <a href="http://cfpb.github.io/articles/rules-rules/">
              parsing
            </a>,{' '}
            <a href="http://off-by-one-mag.github.io/issue-1/articles/constraint-programming/">
              constraint programming
            </a>,{' '}
            <Link to="/writings/vim-faq/">ViM</Link>,{' '}
            <a href="https://18f.gsa.gov/2015/04/09/flexibility-when-releasing-a-new-product-peace-corps-new-donation-platform/">
              trade-offs
            </a>, to verifiable forensics (
            <a href="http://csf2014.di.univr.it/accepted">CSF &lsquo;14</a>)
          </PridePoint>
          <PridePoint title="Contributions">
            upstream, with patches/plugins/discussions to Vim, Trac, Dispatch,
            various Django libraries
          </PridePoint>
          <PridePoint title="Open Source">
            personal projects for mixing podcasts, classifying news, a static
            personal site, web scrapers, etc.
          </PridePoint>
          <PridePoint title="Purpose">
            matters. Apps for pro bono attorneys, charities, regulators, Peace
            Corps volunteers, and do-gooders
          </PridePoint>
        </section>
      </div>
    </div>
  );
}
