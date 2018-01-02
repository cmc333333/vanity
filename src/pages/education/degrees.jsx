import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../util/set-page-title';
import typography from '../../util/typography';

const University = glamorous.span(
  typography.scale(1 / 6),
  {
    display: 'block',
    fontStyle: 'italic',
    marginBottom: typography.rhythm(2 / 3),
  },
);

function Degree({ children, title }) {
  return (
    <glamorous.Div marginTop={typography.rhythm(1)}>
      <glamorous.H2 css={typography.scale(1 / 3)} marginBottom={0} marginTop={0}>
        { title }
      </glamorous.H2>
      <glamorous.Div paddingLeft={typography.rhythm(1)}>
        { children }
      </glamorous.Div>
    </glamorous.Div>
  );
}
Degree.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default function Degrees() {
  return (
    <div>
      { setPageTitle('Degrees & Certificates') }
      <Degree title="Master of Science, Computer Science (with Distinction)">
        <University>
          College of Computing and Digital Media, Depaul University
          (Chicago, Illinois)
        </University>
        <p>
          Beginning with evening courses in 2010, I slowly worked my way
          through a full master&rsquo;s degree by 2014. Half way through, I
          joined a research group which focused on the intersection of
          programming languages and security. Though my course work
          specialized in &ldquo;Theory,&rdquo; this group guided independent
          studies and my graduate thesis: &ldquo;
          <a href="http://cmc333333.github.io/forensics-thesis-code/formalized-forensics.pdf">
            Formalized Forensics
          </a>&rdquo;. I maintained a 4.00 GPA throughout my studies.
        </p>
      </Degree>
      <Degree title="Bachelor of Arts, Computer Science (with Honors)">
        <University>Grinnell College (Grinnell, Iowa)</University>
        <p>
          Completing a four-year degree in three, I graduated in 2008. While
          taking the maximum course load, I audited non-degree classes and
          worked nearly half time. This led to a healthy mixed curriculum of
          STEM and liberal arts. Entering with an Honors Scholarship, I was
          recognized on the Dean&rsquo;s List and ended with a GPA of 3.69.
        </p>
      </Degree>
      <Degree title="Certificates from Continuing Education">
        <glamorous.P marginTop={typography.rhythm(2 / 3)}>
          Largely through online instruction (notably:{' '}
          <a href="https://coursera.org">Coursera</a>,{' '}
          <a href="https://edx.org">edX</a>, and{' '}
          <a href="https://udacity.com">Udacity</a>), my academic study has
          continued long after completing traditional university. In fact, I
          can safely claim to have completed a second bachelor&rsquo;s-worth
          of study.  Often, this work is recognized through semi-formal
          certification.
        </glamorous.P>
      </Degree>
    </div>
  );
}
