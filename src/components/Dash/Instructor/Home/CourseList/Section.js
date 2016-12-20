/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Filter from '../../Section/Filter';
import CourseList from './CourseList';

function filterCourses(filter, courses) {
  switch (filter) {
    case 'ALL': {
      return courses;
    }
    case 'CURRENT_TERM': {
      return courses
        .filter(c => c.term === 'winter');
    }
    case 'PRIOR_TERM': {
      // TODO: fix lazy implementation
      return courses
        .filter((c) => c.term !== 'winter');
    }
    default: {
      throw new Error(`Invalid course filter ${filter}`);
    }
  }
}

const Section = ({
  navigate,
  courses,
  goToCourse,
  joinCourse,
  filter,
  changeFilter,
}) => {
  return (
    <div className="full-pane card">
      <div className="header">
        <h1 className="heading">Course List</h1>
      </div>
      <div className="r">
        <p className="filters-text">Filters:</p>
        <Filter
          isActive={filter === 'ALL'}
          text="All"
          onClick={() => {
            if (filter !== 'ALL') {
              changeFilter('ALL');
            }
          }}
        />
        <Filter
          isActive={filter === 'CURRENT_TERM'}
          text="Current Term"
          onClick={() => {
            if (filter !== 'CURRENT_TERM') {
              changeFilter('CURRENT_TERM');
            }
          }}
        />
        <Filter
          isActive={filter === 'PRIOR_TERM'}
          text="Prior Term"
          onClick={() => {
            if (filter !== 'PRIOR_TERM') {
              changeFilter('PRIOR_TERM');
            }
          }}
        />
      </div>
      <CourseList
        courses={filterCourses(filter, courses)}
        navigate={navigate}
        goToCourse={goToCourse}
        joinCourse={joinCourse}
      />
    </div>
  );
};

export default Section;
