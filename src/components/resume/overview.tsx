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

const FullHeader = styled(SectionHeader)(columns({ small: 12 }));

const Overview: React.FC = () => (
  <BorderedRow>
    <FullHeader>Skills &amp; Hats</FullHeader>
    <ThirdCol>
      <SubSectionHeader>Data &amp; Web App Developer</SubSectionHeader>
      <MarkerlessList>
        <li>Data Modeling, Analysis, &amp; ETL</li>
        <li>Test-driven, API-first Engineering</li>
        <li>Text Parsing, Data Viz and Maps</li>
        <li>Scalable DevSecOps Solutions</li>
      </MarkerlessList>
    </ThirdCol>
    <ThirdCol>
      <SubSectionHeader>Communicator &amp; Teammate</SubSectionHeader>
      <MarkerlessList>
        <li>Play Many Roles, Filling Gaps</li>
        <li>Tight-Knit Peers Sharing Skills</li>
        <li>Thoughtful Critiques &amp; Reviews</li>
        <li>Continuous Research &amp; Learning</li>
      </MarkerlessList>
    </ThirdCol>
    <ThirdCol>
      <SubSectionHeader>Strategy &amp; Leadership</SubSectionHeader>
      <MarkerlessList>
        <li>Decompose Gnarly Problems</li>
        <li>Agile &amp; User-Centered Design</li>
        <li>Balance Delivery &amp; Vision</li>
        <li>Build Buy-in, Gain Momentum</li>
      </MarkerlessList>
    </ThirdCol>
  </BorderedRow>
);
export default Overview;
