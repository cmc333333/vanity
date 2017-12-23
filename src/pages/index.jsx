import Link from 'gatsby-link';
import React from 'react';

import resume from '../assets/lubinski-resume.pdf';
import setPageTitle from '../util/set-page-title';
import './resume.scss';

const email = 'cm.lubinski@gmail.com';

export default function Index() {
  return (
    <div>
      { setPageTitle('Résumé') }
      <div className="row-fluid">
        <div className="span6"><a href={resume}>PDF Version</a></div>
        <div className="Span6 text-right">
          <a href="https://docs.google.com/document/d/1OYoK67HSMKl9KwzWvLc2TGmsAZVGkwB2U3mm4GHsmu0/edit">
            Google Drive Version
          </a>
        </div>
      </div>
      <div id="resume">
        <section className="row-fluid">
          <section className="span6 text-center">
            <h2>C.M. Lubinski</h2>
            <h3>Humble Hacker</h3>
          </section>
          <section className="span6 text-center" style={{ paddingTop: '1em' }}>
            <p>
              <a href={`mailto:${email}`}>{ email }</a>
              &ndash; 872.333.9262
            </p>
            <p>Pittsburgh, PA 15203</p>
            <p><a href="http://cmlubinski.info">http://cmlubinski.info</a></p>
          </section>
        </section>
        <div className="row-fluid no-border">
          <h4>Relevant Skills &amp; Interests</h4>
        </div>
        <section className="row-fluid">
          <div className="span4">
            <h5>Web Development</h5>
            <ul className="no-marker">
              <li>Model-View-Controller</li>
              <li>Static Site Generators &amp; Caching</li>
              <li>Content Management Systems</li>
            </ul>
            <h5>APIs &amp; Data</h5>
            <ul className="no-marker">
              <li>RESTful clients &amp; services</li>
              <li>Relational &amp; Document DBs</li>
              <li>Search Indexes, Key-Value Stores</li>
            </ul>
          </div>
          <div className="span4">
            <h5>Natural Language Processing</h5>
            <ul className="no-marker">
              <li>Parsing &amp; Formal Grammars</li>
              <li>Search &amp; Information Retrieval</li>
              <li>Machine &amp; Statistical Learning</li>
            </ul>
            <h5>Geospatial/GIS</h5>
            <ul className="no-marker">
              <li>Slippy Maps, Interactive Displays</li>
              <li>Geo-aware DBs, Frameworks</li>
              <li>Importing Data (Census/ACS)</li>
            </ul>
          </div>
          <div className="span4">
            <h5>Rapid, Stable Delivery</h5>
            <ul className="no-marker">
              <li>Cloud infrastructure/deployments</li>
              <li>Unit Tests, Continuous Integrat&rsquo;n</li>
              <li>Release Early, Always Shipping</li>
            </ul>
            <h5>Teamwork</h5>
            <ul className="no-marker">
              <li>Agile, Open Source Development</li>
              <li>Tight-knit Peers, Always Learning</li>
              <li>Code Review via Pull Request</li>
            </ul>
          </div>
        </section>
        <section className="row-fluid">
          <h4><Link to="/cv/work">Recent Work History</Link></h4>
          <h5>
            Innovation Specialist &mdash;{' '}
            <a href="https://18f.gsa.gov/">
              18F (General Services Administration)
            </a>
            <span>Sept &rsquo;14 &ndash; Present</span>
          </h5>
          <ul className="no-marker no-indent">
            <li>
              <span className="hl">
                <a href="https://github.com/18f/C2">Communicart</a>
              </span>{' '}
              Web &amp; email-based approval tracking. Ruby, Rails, Postgres,
              Cloud Foundry
            </li>
            <li>
              <span className="hl">
                <a href="https://github.com/18f/peacrcorps-site">
                  Peace Corps Donations
                </a>
              </span>{' '}
              CMS &amp; payment collection. Python, Django, Postgres, JS &amp;
              Grunt, SASS, AWS
            </li>
          </ul>
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
          <h5>
            Backend Developer &mdash;{' '}
            <a href="http://consumerfinance.gov/">
              Consumer Financial Protection Bureau
            </a>
            <span>Dec &rsquo;12 &ndash; Sept &rsquo;14</span>
          </h5>
          <ul className="no-marker no-indent">
            <li>
              <span className="hl">
                <a href="https://github.com/cfpb/mapusaurus">Mapusaurus</a>
              </span>{' '}
              Slippy-map highlighting red-lining cases. Python, GeoDjango,
              PostGIS, Leaflet, Topo JSON
            </li>
            <li>
              <span className="hl">
                <a href="https://github.com/cfpb/eregulations">
                  eRegulations
                </a>
              </span>{' '}
              Regulation parser, compiler, and viewer. Python, Django, MySQL,
              Solr, Backbone
            </li>
          </ul>
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
          <h5>
            Chief Developer &mdash;{' '}
            <a href="http://toodalu.com/">Toodalu, LLC (acquired)</a>
            <span>Aug &rsquo;10 &ndash; Dec &rsquo;12</span>
          </h5>
          <ul className="no-marker no-indent">
            <li>
              <span className="hl">APIs</span>{' '}
              Securely stored &amp; served data; core business logic. Scala,
              Lift, REST, JSON, PostGIS, Mongo, Solr
            </li>
            <li>
              <span className="hl">Web UIs</span>{' '}
              Corresponding user, merchant, sales, &amp; admin apps. Scala,
              Lift, Wordpress
            </li>
          </ul>
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
          <h5>
            Web Developer &mdash;{' '}
            <a href="http://networkninja.com/">Network Ninja, Inc.</a>
            <span>Jun &rsquo;08 &ndash; Aug &rsquo;10</span>
          </h5>
          <ul className="no-marker no-indent">
            <li>
              <span className="hl">Legal Server</span>{' '}
              Client/document tracking for pro bono attorneys. Object-oriented
              PHP, Postgres
            </li>
          </ul>
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
        </section>
        <section className="row-fluid">
          <section className="span6">
            <h4>Formal Education</h4>
            <h5>
              DePaul University
              <span>Chicago, IL</span>
            </h5>
            <ul className="no-marker">
              <li>
                MS, Computer Science (Theory), 2014{' '}
                <span className="right">GPA 4.00</span>
              </li>
              <li>
                &ldquo;
                <a href="http://cmc333333.github.io/forensics-thesis-code/formalized-forensics.pdf">
                  Formalized Forensics
                </a>
                &rdquo;: Master&rsquo;s Thesis
              </li>
            </ul>
            <h5>
              Grinnell College
              <span>Grinnell, IA</span>
            </h5>
            <ul className="no-marker">
              <li>
                BA, Computer Science (Honors), 2008{' '}
                <span className="right">GPA 3.69</span>
              </li>
              <li>
                Dean&rsquo;s List, Honors Scholarship,{' '}
                <a href="http://www.siguccs.org/Conference/Fall2007/awards_winners.php">
                  ACM award
                </a>,
                TA
              </li>
            </ul>
          </section>
          <section className="span6">
            <h4>Continued Education</h4>
            <h5>
              Online Courses
              <span>(Coursera, Udacity, edX, Stanford, etc.)</span>
            </h5>
            <ul className="no-marker">
              <li>AI, Bioinformatics, Crypto, Data Sci, Discrete Opt,</li>
              <li>Formal Logic, ML, Network Analysis, NLP, & more</li>
            </ul>
            <h5>
              Informal
              <span>(Conferences, Meetups, etc.)</span>
            </h5>
            <ul className="no-marker">
              <li>Strange Loop, OSCON, Lambda Jam, Philly ETE</li>
              <li>
                Self-study:{' '}
                <Link to="/misc/books">books</Link>,{' '}
                <Link to="/misc/podcasts">podcasts</Link>,
                and a tendency to tinker
              </li>
            </ul>
          </section>
        </section>
        <section className="row-fluid">
          <h4>Other Points of Pride</h4>
          <p>
            <span className="hl">Presentations</span>{' '}
            about{' '}
            <Link to="/writings/cryptography-and-security-for-coders">
              security
            </Link>,{' '}
            <a href="https://docs.google.com/presentation/d/12SL5zFNW8N7Hta3hvuXd49N0IvQWq6nvb5C0CMNZVpY/edit?usp=sharing">
              static sites
            </a>,
            team morale, and more at conferences, meetups, &amp; work
          </p>
          <p>
            <span className="hl">Articles</span>{' '}
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
            <a href="http://csf2014.di.univr.it/accepted">CSF &rsquo;14</a>)
          </p>
          <p>
            <span className="hl">Contributions</span>{' '}
            upstream, with patches/plugins/discussions to Vim, Trac, Dispatch,
            various Django libraries
          </p>
          <p>
            <span className="hl">Open Source</span>{' '}
            personal projects for mixing podcasts, classifying news, a static
            personal site, web scrapers, etc.
          </p>
          <p>
            <span className="hl">Purpose</span>{' '}
            matters. Apps for pro bono attorneys, charities, regulators, Peace
            Corps volunteers, and do-gooders
          </p>
        </section>
      </div>
    </div>
  );
}
