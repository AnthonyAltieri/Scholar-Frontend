/**
 * @author Anthony Altieri on 9/6/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';
import { push } from 'react-router-redux';
import * as OverlayActions from '../../../../actions/Overlay';
import * as CourseActions from '../../../../actions/Course';
import * as QuestionListActions from '../../../../actions/QuestionList';
import { isLoggedIn } from '../../../../api/User';
import { enterCourseSession } from '../../../../api/CourseSession';
import { toastr } from 'react-redux-toastr';

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
      enterCourse,
      receivedQuestions,
    } = this.props;
    console.log('CourseList')
    console.log('visibleCourses', visibleCourses);
    return (
      <Courses
        courses={visibleCourses}
        userId={userId}
        filter={filter}
        onEnterClick={async function(
          courseId,
          abbreviation,
          title,
          activeCourseSessionId,
          timeStart,
          timeEnd,
        ) {
          const payload = await enterCourseSession(courseId, userId);
          const { courseSession, error } = payload;
          if (!!error) {
            console.error("[ERROR] CourseList (component) > enterCourseSession");
            toastr.error("Error: Could not join the Course. Please Refresh and try again");
            return;
          }
          console.log("Success! We will now enter the course session");
          receivedQuestions(courseSession.questions);
          enterCourse(
            courseId,
            abbreviation,
            title,
            activeCourseSessionId,
            timeStart,
            timeEnd,
          );
        }}
      />
    );
  }
}

const stateToProps = (state) => ({
  filter: state.Courses.filter || 'active',
  visibleCourses: state.Courses.visible || [],
  isLoggedIn: state.User.isLoggedIn,
  userId: state.User.id,
  userType: state.User.type,
});
const dispatchToProps = (dispatch) => ({
  hideOverlay: () => {
    dispatch(OverlayActions.hideOverlay());
  },
  enterCourse: (
    courseId,
    abbreviation,
    title,
    activeCourseSessionId,
    timeStart,
    timeEnd,
  ) => {
    const action =
      CourseActions.joinCourse(
        courseId,
        abbreviation,
        title,
        activeCourseSessionId,
        timeStart,
        timeEnd,
      );
      console.log('action', action);
    dispatch(action);
    dispatch(push('/dash/student/'));
  },
  receivedQuestions: (questions) => {
    dispatch(QuestionListActions.receivedQuestions(questions));
  },
});

CourseList = connect(
  stateToProps,
  dispatchToProps,
)(CourseList);

export default CourseList;
