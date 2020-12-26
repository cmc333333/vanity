import styled from "@emotion/styled";
import * as React from "react";

import { Row } from "../common";
import { columns } from "../../styles/grid";
import {
  baseSpace,
  BorderedRow,
  InlineList,
  SectionHeader,
  SubSectionHeader,
} from "./utils";

interface JobHeaderProps {
  company: string;
  dates: string;
  location: string;
  title: string;
}

const JobHeader: React.FC<JobHeaderProps> = ({
  company,
  dates,
  location,
  title,
}) => (
  <Row>
    <SubSectionHeader css={columns({ small: 6, medium: 3 })}>
      {title}
    </SubSectionHeader>
    <span
      css={{
        ...columns({ small: 6, medium: 3 }),
        float: "right",
        textAlign: "right",
      }}
    >
      {dates}
    </span>
    <span
      css={{
        ...columns({ small: 12, medium: 6 }),
        fontStyle: "italic",
        textAlign: "center",
      }}
    >
      {company} &mdash; {location}
    </span>
  </Row>
);

const Description = styled.p({ marginBottom: baseSpace });
const TechList = styled(InlineList)({ marginBottom: baseSpace });

const WorkHistory: React.FC = () => (
  <BorderedRow>
    <SectionHeader>Recent Work History</SectionHeader>
    <JobHeader
      company="18F (General Services Administration)"
      dates="Sept '14 - Present"
      location="Remote"
      title="Backend Lead"
    />
    <Description>
      Government tech startup improving the public’s experience through shared
      services, best practices, &amp; open data
    </Description>
    <TechList>
      <li>Python</li>
      <li>ES6</li>
      <li>SASS</li>
      <li>Ruby</li>
      <li>Django</li>
      <li>NodeJS</li>
      <li>React</li>
      <li>Next.js</li>
      <li>Rails</li>
      <li>Postgres</li>
      <li>AWS</li>
      <li>Cloud Foundry</li>
    </TechList>
    <ul>
      <li>
        Launched a dozen significant projects through close collaboration with
        agency partners, designers, and devs
      </li>
      <li>
        Spanned full development stack, including devops, ETL scripts, APIs,
        security, interfaces, and visualizations
      </li>
      <li>
        Promoted to “Lead” of 30+ engineers; hosted presentations, discussions,
        code reviews, and pairing sessions
      </li>
      <li>
        Set high expectations for code contributions, focusing on legibility,
        testability, and clean code principles
      </li>
      <li>
        Filtered ~100 resumes and interviewed nearly 50 technical candidates,
        leading to eight 18F hires
      </li>
    </ul>
    <JobHeader
      company="Consumer Financial Protection Bureau"
      dates="Dec '12 - Sep '14"
      location="Remote"
      title="Backend Developer"
    />
    <Description>
      Technology Fellowship building public-facing web apps and internal data
      analysis tools for bank regulators
    </Description>
    <TechList>
      <li>Python</li>
      <li>JavaScript</li>
      <li>LESS</li>
      <li>Django</li>
      <li>Flask</li>
      <li>Backbone</li>
      <li>Leaflet</li>
      <li>MySQL</li>
      <li>PostGIS</li>
      <li>Solr</li>
      <li>CentOS</li>
    </TechList>
    <ul>
      <li>
        Shipped three major, user-centric software projects and two significant
        prototypes, iterating each frequently
      </li>
      <li>
        Contributed to high test coverage, style guide adherence, &amp; code
        review via frequent discussion/feedback
      </li>
      <li>
        Promoted policies on transparency, open source, and releasing software
        through working groups &amp; writings
      </li>
    </ul>
    <JobHeader
      company="Toodalu, LLC"
      dates="Aug '10 - Nov '12"
      location="Chicago & Work from Home"
      title="Chief Developer"
    />
    <Description>
      Quickly evolving, location-based startup focusing on loyalty rewards,
      charitable giving, and white-labeled apps
    </Description>
    <TechList>
      <li>Scala</li>
      <li>Python</li>
      <li>Lift</li>
      <li>jQuery</li>
      <li>Postgres</li>
      <li>MongoDB</li>
      <li>Solr</li>
      <li>Wordpress</li>
      <li>Debian</li>
    </TechList>
    <ul>
      <li>
        Led the majority of technology decisions, shepherded the code base
        through numerous, radical pivots
      </li>
      <li>
        Researched and integrated with credit card processors, social networks,
        CMSes, mobile utilities, and more
      </li>
      <li>
        Configured and maintained all servers, including continuous integration
        with black-box integration tests
      </li>
    </ul>
    <JobHeader
      company="Network Ninja, Inc."
      dates="Jun '08 - Aug '10"
      location="Chicago"
      title="Web Developer"
    />
    <Description>
      White-labeled case management tool for pro bono legal aid, providing
      document/client tracking and reporting
    </Description>
    <TechList>
      <li>Object-Oriented PHP</li>
      <li>JavaScript</li>
      <li>Python</li>
      <li>Prototype</li>
      <li>Postgres</li>
      <li>Trac</li>
      <li>Drupal</li>
      <li>Debian</li>
    </TechList>
    <ul>
      <li>
        Extended application based on project management priorities, pushing
        weekly; focused on modularity
      </li>
      <li>
        Instituted automation regimes around app setup and unit-testing,
        preventing countless bugs
      </li>
    </ul>
  </BorderedRow>
);
export default WorkHistory;
