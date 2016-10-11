/**
 * @author Anthony Altieri on 9/6/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';
import { push } from 'react-router-redux';
import { isLoggedIn } from '../../../../api/User';

const getVisibleCourses = (filter, courses) => {
  switch (filter) {
    case 'active': {
      return courses.filter(c => c.active);
    }
    case 'inactive': {
      return courses.filter(c => !c.active);
    }
    default: {
      throw new Error(`Invalid Course filter: ${filter}`);
    }
  }
};

class CourseList extends Component {

  render() {
    const { params, visibleCourseFilter, courses, userId,
      userType } = this.props;
    const { filter } = params;
    console.log('courses', courses);
    return (
      <Courses
        courses={getVisibleCourses(visibleCourseFilter, courses)}
        filter={visibleCourseFilter}
        userId={userId}
        userType={userType}
      />
    );
  }
}
CourseList = connect(
  (state) => ({
    visibleCourseFilter: state.CourseList.VisibleCourseFilter,
    courses: state.CourseList.Courses,
    userId: state.User.id,
    userType: state.User.type,
    isLoggedIn: state.User.isLoggedIn,
  })
)(CourseList);

export default CourseList;
