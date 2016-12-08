/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Filter from '../../Section/Filter';
import CourseList from './CourseList';

const Section = ({
  navigate,
  courses,
  goToCourse,
  joinCourse,
  filter,
}) => {
  return (
    <div className="top-pane card">
      <div className="header">
        <h1 className="heading">Course List</h1>
      </div>
      <div className="r">
        <p className="filters-text">Filters:</p>
        <Filter
          isActive={filter === 'ALL'}
          text="All"
        />
        <Filter
          isActive={filter === 'CURRENT_TERM'}
          text="Current Term"
        />
        <Filter
          isActive={filter === 'PRIOR_TERM'}
          text="Prior Term"
        />
      </div>
      <CourseList
        courses={courses}
        navigate={navigate}
        goToCourse={goToCourse}
        joinCourse={joinCourse}
      />
    </div>
  );
};

export default Section;
