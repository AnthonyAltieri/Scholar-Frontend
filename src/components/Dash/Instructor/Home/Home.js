/**
 * @author Anthony Altieri on 11/18/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import * as LoadingActions from '../../../../actions/Loading';
import { getByUser as getCoursesByUser } from '../../../../api/Courses';
import * as CoursesActions from '../../../../actions/Dash/Courses/Courses';
import * as ModeActions from '../../../../actions/DashInstructor/Course/Mode';
import * as CourseActions from '../../../../actions/Course';
import CourseListSection from './CourseList/Section';
import CourseSessionListSection from './CourseSessionList/Section';
import { setId as setAssessmentBankId } from '../../../../actions/AssessmentBank';
import { getByUserId as getAssessmentBankByUserId } from '../../../../api/AssessmentBank';


async function handleCourses(userId, receivedCourses) {
  try {
    const result = await getCoursesByUser(userId);
    const { courses, error } = result;
    if (!!error) {
      toastr.error('Unable to retrieve Courses', 'Please refresh the page');
      return;
    }
    console.log('courses', courses)
    receivedCourses(courses);
  } catch (e) {
    console.error('retrieve course error', e);
    toastr.error('Unable to retrieve Courses', 'Please refresh the page');
  }
}

async function handleAssessmentBankId(
  userId,
  receivedBankId,
) {
  try {
    const { error, assessmentBankId} = await
      getAssessmentBankByUserId(userId);
    if (!!error) {
      console.log('[ERROR] getAssessmentBankByUserId', e);
      return;
    }
    receivedBankId(assessmentBankId);
  } catch (e) {
    console.error('[ERROR] Home handleAssessmentBankId', e);
  }
}


class Home extends Component {
  componentDidMount() {
    const {
      userId,
      navigate,
      receivedCourses,
      endLoading,
      receivedBankId,
    } = this.props;

    if (!userId) {
      toastr.info('You have been logged out', 'Please log in again');
      navigate('/login/');
      return;
    }

    handleCourses(
      userId,
      receivedCourses
    );
    handleAssessmentBankId(
      userId,
      receivedBankId,
    )
    endLoading();
  }


  render() {
    const {
      navigate,
      courses,
      goToCourse,
      courseListFilter,
      joinCourse,
      courseSessionFilter,
    } = this.props;

    return (
      <div className="home-instructor">
        <CourseListSection
          courses={courses}
          filter={courseListFilter}
          goToCourse={goToCourse}
          joinCourse={joinCourse}
          navigate={navigate}
        />
        <CourseSessionListSection
          courses={courses}
          filter={courseSessionFilter}
        />
      </div>
    );

  }
};
const stateToProps = (state) => ({
  courses: state.Courses.all || [],
  userId: state.User.id,
});
const dispatchToProps = (dispatch) => ({
  endLoading: () => {
    dispatch(LoadingActions.endLoading());
  },
  receivedCourses: (courses) => {
    dispatch(CoursesActions.receivedCourses(courses));
  },
  goToCourse: (courseId) => {
    dispatch(ModeActions.setMode('MAIN'));
    dispatch(push(`/dash/instructor/course/${courseId}`))
  },
  navigate: (url) => {
    dispatch(push(url));
  },
  joinCourse: (
    id,
    abbreviation,
    title,
    activeCourseSessionId,
    timeStart,
    timeEnd,
  ) => {
      dispatch(
        CourseActions.joinCourse(
          id,
          abbreviation,
          title,
          activeCourseSessionId,
          timeStart,
          timeEnd,
        )
      )
  },
  receivedBankId: (id) => {
    dispatch(setAssessmentBankId(id));
  }
});

Home = connect(
  stateToProps,
  dispatchToProps,
)(Home);


export default Home;
