/**
 * @author Anthony Altieri on 9/6/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';
import { push } from 'react-router-redux';
import * as OverlayActions from '../../../../actions/Overlay';
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
  componentDidMount() {
    this.props.hideOverlay();
  }


  render() {
    const {
      visibleCourses,
      userId,
      filter,
    } = this.props;
    console.log('CourseList')
    console.log('visibleCourses', visibleCourses);
    return (
      <Courses
        courses={visibleCourses}
        userId={userId}
        filter={filter}
      />
    );
  }
}

const stateToProps = (state) => ({
  filter: state.Courses.filter || 'active',
  visibleCourses: state.Courses.visible || [],
});
const dispatchToProps = (dispatch) => ({
  hideOverlay: () => {
    dispatch(OverlayActions.hideOverlay());
  }
});

CourseList = connect(
  stateToProps,
  dispatchToProps,
)(CourseList);

export default CourseList;
