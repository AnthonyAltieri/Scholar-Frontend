/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Filter from '../../Section/Filter';
import CourseList from './CourseList';
import RaisedButton from 'material-ui/RaisedButton';

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
  showAddCodeDialog,
  chooseCourse,
  selectedCourse,
  onCourseClick,
}) => {
  return (
    <div
      className="full-pane card"
      style={{
        bottom: 160,
      }}
    >
      <div
        className="header"
        style={{
          borderBottom: '1px dashed #ece7ef',
        }}
      >
        <h1
          className="heading"
          style={{
            marginRight: 18,
            borderBottom: 'none',
          }}
        >
          Course List
        </h1>
        <RaisedButton
          label="view add codes"
          secondary
          onTouchTap={() => showAddCodeDialog()}
        />
      </div>
      <CourseList
        onCourseClick={onCourseClick}
        courses={filterCourses(filter, courses)}
        navigate={navigate}
        goToCourse={goToCourse}
        joinCourse={joinCourse}
        chooseCourse={chooseCourse}
        selectedCourse={selectedCourse}
      />
    </div>
  );
};

// <div className="r">
//   <p className="filters-text">Filters:</p>
//   <Filter
//     isActive={filter === 'ALL'}
//     text="All"
//     onClick={() => {
//             if (filter !== 'ALL') {
//               changeFilter('ALL');
//             }
//           }}
//   />
//   <Filter
//     isActive={filter === 'CURRENT_TERM'}
//     text="Current Term"
//     onClick={() => {
//             if (filter !== 'CURRENT_TERM') {
//               changeFilter('CURRENT_TERM');
//             }
//           }}
//   />
//   <Filter
//     isActive={filter === 'PRIOR_TERM'}
//     text="Prior Term"
//     onClick={() => {
//             if (filter !== 'PRIOR_TERM') {
//               changeFilter('PRIOR_TERM');
//             }
//           }}
//   />
// </div>

export default Section;
