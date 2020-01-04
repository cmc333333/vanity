import PropTypes from 'prop-types';
import React from 'react';

import { Row } from '../common';
import { columns } from '../../styles';
import { BorderedRow, LeftCol, RightCol, ParagraphWithTitle, SectionHeader, SubSectionHeader } from './utils';


function Degree({ children, date, title }) {
  return (
    <div>
      <Row>
        <SubSectionHeader css={columns({ small: 9 })}>
          { title }
        </SubSectionHeader>
        <span css={{ ...columns({ small: 3 }), textAlign: 'right' }}>
          { date }
        </span>
      </Row>
      <p>{ children }</p>
    </div>
  );
}
Degree.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default function Education() {
  return (
    <BorderedRow>
      <LeftCol>
        <SectionHeader>Education</SectionHeader>
        <Degree date="2014" title="Master of Science with Distinction">
          Computer Science (Theory), DePaul University
        </Degree>
        <Degree date="2008" title="Bachelor of Arts with Honors">
          Computer Science, Grinnell College
        </Degree>
      </LeftCol>
      <RightCol>
        <SectionHeader>Continuing</SectionHeader>
        <ParagraphWithTitle title="MOOCs">
          on AI, Crypto, Data Science, Formal Logic, Journalism, ML, Network
          Analysis, NLP, &amp; more
        </ParagraphWithTitle>
        <ParagraphWithTitle title="Self-study">
          through conferences, meetups, podcasts, articles, books, and a
          tendency to tinker
        </ParagraphWithTitle>
      </RightCol>
    </BorderedRow>
  );
}
