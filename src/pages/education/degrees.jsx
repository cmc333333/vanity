import { graphql } from 'gatsby';
import glamorous from 'glamorous';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Layout, { educationSidebar } from '../../layouts';
import { scaleText, spacing } from '../../styles';

const University = glamorous.span(
  scaleText(1 / 4),
  {
    display: 'block',
    fontStyle: 'italic',
    marginBottom: spacing(1 / 2),
  },
);
const UniversitylessP = glamorous.p({ marginTop: spacing(1 / 2) });

function Degree({ children, title }) {
  return (
    <glamorous.Div marginTop={spacing()}>
      <glamorous.H2 marginBottom={0} marginTop={0}>
        { title }
      </glamorous.H2>
      <glamorous.Div paddingLeft={spacing()}>
        { children }
      </glamorous.Div>
    </glamorous.Div>
  );
}
Degree.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

function Certificates({ data }) {
  const ordered = _.orderBy(data, ['certificate.date'], ['desc']);
  return (
    <glamorous.Ul listStyleType="none" marginLeft={0}>
      { ordered.map(wc => (
        <glamorous.Li
          key={wc.title}
          paddingLeft={spacing()}
          textIndent={`-${spacing()}`}
        >
          { wc.certificate.type }
          { wc.certificate.distinction ?
              ` (${wc.certificate.distinction})` : null }
          {', "'}
          { wc.url ? <a href={wc.url}>{ wc.title }</a> : wc.title }
          {'" from '}
          { wc.university }
        </glamorous.Li>
        )) }
    </glamorous.Ul>
  );
}
Certificates.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    certificate: PropTypes.shape({
      date: PropTypes.string.isRequired,
      distinction: PropTypes.string,
      type: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
};


function NonCertificates({ data }) {
  const ordered = _.orderBy(data, ['end'], ['desc']);
  return (
    <glamorous.Ul listStyleType="none" marginLeft={0}>
      { ordered.map(wc => (
        <glamorous.Li
          key={wc.title}
          paddingLeft={spacing()}
          textIndent={`-${spacing()}`}
        >
          {'"'}
          { wc.url ? <a href={wc.url}>{ wc.title }</a> : wc.title }
          {'" from '}
          { wc.university }
        </glamorous.Li>
        )) }
    </glamorous.Ul>
  );
}
NonCertificates.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    end: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
};

export default function Degrees({ data }) {
  const courses = data.allCoursesYaml.edges.map(e => e.node);
  const [withCerts, withoutCerts] = _.partition(courses, c => c.certificate);
  return (
    <Layout sidebar={educationSidebar} title="Degrees & Certificates">
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
        <UniversitylessP>
          Largely through online instruction (notably:{' '}
          <a href="https://coursera.org">Coursera</a>,{' '}
          <a href="https://edx.org">edX</a>, and{' '}
          <a href="https://udacity.com">Udacity</a>), my academic study has
          continued long after completing traditional university. In fact, I
          can safely claim to have completed a second bachelor&rsquo;s-worth
          of study.  Often, this work is recognized through semi-formal
          certification.
        </UniversitylessP>
        <Certificates data={withCerts} />
      </Degree>
      <Degree title="Non-degree Programs">
        <UniversitylessP>
          Of course, not all education programs end with a degree or
          certificate. While still following academic progression via a
          structured content, if the bulk of the material is covered through
          self-study, there&rsquo;s less incentive for institutions to certify
          learners. This shouldn&rsquo;t diminish the courses, however; many
          are on par with their degree-granting kin.
        </UniversitylessP>
        <NonCertificates data={withoutCerts} />
      </Degree>
    </Layout>
  );
}
Degrees.propTypes = {
  data: PropTypes.shape({
    allCoursesYaml: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.arrayOf(PropTypes.shape({
          certificate: PropTypes.shape({
            date: PropTypes.string.isRequired,
            distinction: PropTypes.string,
            type: PropTypes.string.isRequired,
          }).isRequired,
          end: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          university: PropTypes.string.isRequired,
          url: PropTypes.string,
        })).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allCoursesYaml(
      filter: {
        university: { regex: "/^(?!Grinnell)(?!DePaul)/" }
      }
    ) {
      edges {
        node {
          certificate {
            date
            distinction
            type
          }
          end
          title
          university
          url
        }
      }
    }
  }
`;
