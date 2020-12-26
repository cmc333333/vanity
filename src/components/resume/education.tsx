import * as React from "react";

import { Row } from "../common";
import { columns } from "../../styles/grid";
import {
  BorderedRow,
  LeftCol,
  RightCol,
  ParagraphWithTitle,
  SectionHeader,
  SubSectionHeader,
} from "./utils";

interface DegreeProps {
  children: React.ReactNode;
  date: string;
  title: string;
}
const Degree: React.FC<DegreeProps> = ({ children, date, title }) => (
  <div>
    <Row>
      <SubSectionHeader css={columns({ small: 9 })}>{title}</SubSectionHeader>
      <span css={{ ...columns({ small: 3 }), textAlign: "right" }}>{date}</span>
    </Row>
    <p>{children}</p>
  </div>
);

const Education: React.FC = () => (
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
        through conferences, meetups, podcasts, articles, books, and a tendency
        to tinker
      </ParagraphWithTitle>
    </RightCol>
  </BorderedRow>
);
export default Education;
