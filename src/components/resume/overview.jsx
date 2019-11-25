import styled from '@emotion/styled';
import React from 'react';

import { columns } from '../../styles';
import { baseSpace, BorderedRow, InlineList, MarkerlessList, SectionHeader, SubSectionHeader, ThirdCol } from './utils';


const TagList = styled(InlineList)({ marginBottom: baseSpace });

export default function Overview() {
  return (
    <BorderedRow>
      <SectionHeader css={columns({ small: 12 })}>
        Skills &amp; Hats
      </SectionHeader>
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
}
