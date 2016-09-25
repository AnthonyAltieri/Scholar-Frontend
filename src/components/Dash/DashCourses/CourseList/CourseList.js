/**
 * @author Anthony Altieri on 9/6/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';
import { fetchCourses } from '../../../../api/Courses';
import { push } from 'react-router-redux';
import * as CourseListActions from '../../../../actions/CourseList';

const getVisibleCourses = (filter, courses) => {
  switch (filter) {
    case 'active': {
      return courses.filter(c => c.isActive);
    }
    case 'inactive': {
      return courses.filter(c => !c.isActive);
    }
    default: {
      throw new Error(`Invalid Course filter: ${filter}`);
    }
  }
};

class CourseList extends Component {
  componentDidMount() {
    const { filter } = this.props.params;
    if (!filter) {
      this.props.dispatch(push('/dash/courses/active'));
      return;
    }
    fetchCourses(this.props.params.filter)
      .then((courses) => {
        this.props.dispatch(CourseListActions.receivedCourses(courses));
        this.forceUpdate();
      })
  }


  render() {
    const { params, visibleCourseFilter, courses, userId,
      userType } = this.props;
    const { filter } = params;
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
  })
)(CourseList);

export default CourseList;
