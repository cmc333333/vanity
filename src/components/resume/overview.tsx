import styled from "@emotion/styled";
import * as React from "react";

import { columns } from "../../styles/grid";
import { MarkerlessList } from "../common";
import {
  baseSpace,
  BorderedRow,
  InlineList,
  SectionHeader,
  SubSectionHeader,
  ThirdCol,
} from "./utils";

const TagList = styled(InlineList)({ marginBottom: baseSpace });
const FullHeader = styled(SectionHeader)(columns({ small: 12 }));

const Overview: React.FC = () => (
  <BorderedRow>
    <FullHeader>Skills &amp; Hats</FullHeader>
    <ThirdCol>
      <SubSectionHeader>APIs &amp; Data Wrangler</SubSectionHeader>
      <TagList>
        <li>Python</li>
        <li>Postgres</li>
        <li>REST</li>
      </TagList>
      <MarkerlessList>
        <li>API-First Development</li>
        <li>Text Parsing, Machine Learning</li>
        <li>Data Modeling, Analysis, &amp; ETL</li>
        <li>Secure, Scalable Solutions</li>
      </MarkerlessList>
    </ThirdCol>
    <ThirdCol>
      <SubSectionHeader>Web Developer</SubSectionHeader>
      <TagList>
        <li>Django</li>
        <li>NodeJS</li>
        <li>React</li>
        <li>SASS</li>
      </TagList>
      <MarkerlessList>
        <li>Static Site Generators, CMSes</li>
        <li>Visualizations, Maps, Interactions</li>
        <li>DevOps &amp; Cloud Infrastructure</li>
        <li>Tests, Continuous Integration</li>
      </MarkerlessList>
    </ThirdCol>
    <ThirdCol>
      <SubSectionHeader>Communicator &amp; Teammate</SubSectionHeader>
      <TagList>
        <li>Agile</li>
        <li>User-Centered</li>
        <li>Fail-Fast</li>
      </TagList>
      <MarkerlessList>
        <li>Tight-Knit Peers Sharing Skills</li>
        <li>Continuous Research &amp; Learning</li>
        <li>Thoughtful Code Reviews</li>
        <li>Open Source, Transparent Plans</li>
      </MarkerlessList>
    </ThirdCol>
  </BorderedRow>
);
export default Overview;
