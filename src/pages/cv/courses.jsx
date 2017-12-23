import PropTypes from 'prop-types';
import React from 'react';

import setPageTitle from '../../util/set-page-title';
import './courses.css';

class Collapser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: props.startCollapsed };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const HComponent = `h${this.props.hSize}`;
    return (
      <div>
        <div className="header">
          <HComponent onClick={this.toggle}>{ this.props.title }</HComponent>
          { this.props.tags }
        </div>
        <div className={this.state.collapsed ? 'collapse' : null}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
Collapser.propTypes = {
  children: PropTypes.node.isRequired,
  hSize: PropTypes.number.isRequired,
  startCollapsed: PropTypes.bool,
  tags: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
Collapser.defaultProps = {
  startCollapsed: false,
};


function Course({ course }) {
  const {
    professor,
    professorsUniversity,
    tags,
    title,
    university,
  } = course.frontmatter;
  let fromStr = 'From ';
  if (professor) {
    fromStr += `${professor} of `;
    if (professorsUniversity) {
      fromStr += `${professorsUniversity} via `;
    }
  }
  fromStr += university;

  const tagUl = (
    <ul className="categories">
      { (tags || []).map(t => <li key={t}>{ t }</li>) }
    </ul>
  );

  /* eslint-disable react/no-danger */
  return (
    <div id={course.fields.basename} className="course">
      <Collapser hSize={3} startCollapsed tags={tagUl} title={title}>
        <div className="from">{ fromStr }</div>
        <div dangerouslySetInnerHTML={{ __html: course.html }} />
      </Collapser>
    </div>
  );
  /* eslint-enable react/no-danger */
}
Course.propTypes = {
  course: PropTypes.shape({
    fields: PropTypes.shape({
      basename: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      professor: PropTypes.string,
      professorsUniversity: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      university: PropTypes.string.isRequired,
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

function ClassGroup({ classGroup }) {
  const {
    courses,
    first,
    universities,
    year,
  } = classGroup;

  const uniUl = (
    <ul className="universities">
      { universities.map(u => <li key={u}>{ u }</li>) }
    </ul>
  );
  return (
    <div>
      { first ? null : <hr /> }
      <div className="year">
        <Collapser hSize={2} tags={uniUl} startCollapsed={!first} title={year}>
          { courses.map(c => <Course course={c} key={c.fileAbsolutePath} />) }
        </Collapser>
      </div>
    </div>
  );
}
ClassGroup.propTypes = {
  classGroup: PropTypes.shape({
    courses: PropTypes.arrayOf(Course.propTypes.course).isRequired,
    first: PropTypes.bool.isRequired,
    universities: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
};

function classGroups(courses) {
  const byYear = courses.reduce(
    (soFar, next) => {
      const year = next.frontmatter.start.substr(0, 4);
      return {
        ...soFar,
        [year]: (soFar[year] || []).concat([next]),
      };
    },
    {},
  );
  const years = Object.keys(byYear);
  years.reverse();

  return years.map((year, yearIdx) => {
    const sortedCourses = byYear[year];
    const uniSet = new Set(sortedCourses.map(c => c.frontmatter.university));
    const universities = Array.from(uniSet);
    universities.sort();
    return {
      first: yearIdx === 0,
      courses: sortedCourses,
      universities,
      year,
    };
  });
}

export default function Courses({ data }) {
  const groups = classGroups(data.allMarkdownRemark.edges
    .map(e => e.node));
  const children = groups.map(cg => <ClassGroup classGroup={cg} key={cg.year} />);
  return (
    <div>
      { setPageTitle('Courses') }
      { children }
    </div>
  );
}
Courses.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(Course.propTypes.course).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query Courses {
    allMarkdownRemark(
      filter: {
        fields: {
          dirname: { eq: "courses" }
        }
      }
      sort: {
        fields: [frontmatter___start]
        order: DESC
      }
    ) {
      edges {
        node {
          fields { basename }
          frontmatter {
            professor
            professorsUniversity
            start
            tags
            title
            university
          }
          html
        }
      }
    }
  }
`;
