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
import * as HomeCoursesActions from '../../../../actions/DashInstructor/Home/Courses';
import * as OverlayActions from '../../../../actions/Overlay'
import * as AttendanceActions from '../../../../actions/Attendance';
import * as CourseApi from '../../../../api/Course';
import AddCodeDialog from './AddCodeDialog';
import CourseListSection from './CourseList/Section';
import * as CourseSessionApi from '../../../../api/CourseSession';
import PanelSelectedCourse from './PanelSelectedCourse';
import { setId as setAssessmentBankId } from '../../../../actions/AssessmentBank';
import { getByUserId as getAssessmentBankByUserId } from '../../../../api/AssessmentBank';
import {
  setSelectedCourse,
  clearSelectedCourse,
  setCourseSectionPanelLoadingOn,
  setCourseSectionPanelLoadingOff,
  setCourseSectionError,
  clearCourseSectionError,
  setCourseSectionLastCourseSession,
  clearCourseSectionLastCourseSession,
} from '../../../../actions/Dash/Instructor'


async function handleCourses(userId, receivedCourses) {
  try {
    const result = await getCoursesByUser(userId);
    const { courses, error } = result;
    if (!!error) {
      toastr.error('Unable to retrieve Courses', 'Please refresh the page');
      return;
    }
    receivedCourses(courses);
    return courses;
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
  async componentDidMount() {
    const {
      userId,
      navigate,
      receivedCourses,
      endLoading,
      receivedBankId,
      chooseCourse,
      selectedCourse,
    } = this.props;
    console.log('Home componentDidMount()');

    if (!userId) {
      toastr.info('You have been logged out', 'Please log in again');
      navigate('/login/');
      return;
    }


    try {
      const courses = await handleCourses(
        userId,
        receivedCourses
      );
      if (!!selectedCourse.id && !!courses) {
        const course = courses.filter(c => c.id === selectedCourse.id)[0];
        if (!!course) {
          chooseCourse(course);
        }
      }
      await handleAssessmentBankId(
        userId,
        receivedBankId,
      );
    } catch (e) {
      console.error('initial stuff', e);
    }
    endLoading();
  }


  render() {
    const {
      navigate,
      courses,
      goToCourse,
      filter,
      joinCourse,
      courseSessionFilter,
      changeFilter,
      showOverlay,
      hideOverlay,
      isOverlayVisible,
      overlayType,
      chooseCourse,
      selectedCourse,
      isPanelLoading,
      panelLoadingOn,
      panelLoadingOff,
      setLastCourseSession,
      clearLastCourseSession,
      setLastCourseSessionError,
      clearLastCourseSessionError,
      lastCourseSession,
      hasLastCourseSessionError,
    } = this.props;

    return (
      <div className="home-instructor">
        <AddCodeDialog
          isOpen={!!isOverlayVisible && overlayType === 'ADD_CODES'}
          addCodes={courses}
          onOkClick={() => hideOverlay()}
        />
        <CourseListSection
          courses={courses}
          filter={filter}
          goToCourse={goToCourse}
          joinCourse={joinCourse}
          navigate={navigate}
          changeFilter={changeFilter}
          showAddCodeDialog={() => showOverlay('ADD_CODES')}
          chooseCourse={chooseCourse}
          selectedCourse={selectedCourse.id}
          onCourseClick={async (c) => {
            if (c.id === selectedCourse.id) return;
            panelLoadingOn();
            clearLastCourseSession();
            clearLastCourseSessionError();
            chooseCourse(c);
            try {
              const payload = await CourseSessionApi.getMostRecent(c.id);
              if (!!payload.error) {
                toastr.error('Something went wrong please try again');
                setLastCourseSessionError();
                panelLoadingOff();
                return;
              }
              if (!!payload.none) {
               setLastCourseSession(null);
               panelLoadingOff();
               return;
              }
              setLastCourseSession(payload.mostRecentCourseSession);
              panelLoadingOff();
            } catch (e) {
              console.error('[ERROR] onCourseClick', e);
            }
          }}
        />
        {/* <CourseSessionListSection
          courses={courses}
          filter={courseSessionFilter}
        /> */}
        {!!selectedCourse
          ? (
            <PanelSelectedCourse
              abbreviation={selectedCourse.abbreviation}
              title={selectedCourse.title}
              isLoading={isPanelLoading}
              lastCourseSession={lastCourseSession}
              hasLastCourseSessionError={hasLastCourseSessionError}
              hasActiveCourseSession={!!selectedCourse.activeCourseSessionId}
              onClickEnterCourse={() => {
                joinCourse(
                  selectedCourse.id,
                  selectedCourse.abbreviation,
                  selectedCourse.title,
                  selectedCourse.activeCourseSessionId,
                  selectedCourse.timeStart,
                  selectedCourse.timeEnd,
                );
                goToCourse(selectedCourse.id);
              }}
              onClickViewCourseSessions={() => {
              }}
            />
          )
          : null
        }
      </div>
    );

  }
};
const stateToProps = (state) => ({
  courses: state.Courses.all || [],
  userId: state.User.id,
  isOverlayVisible: state.Overlay.isVisible,
  overlayType: state.Overlay.type,
  filter: state.Dash.Instructor.Home.CourseSection.filter || 'ALL',
  selectedCourse: state.Dash.Instructor.Home.CourseSection.selectedCourse,
  isPanelLoading: !!state.Dash.Instructor.Home.CourseSection.isLoading,
  lastCourseSession: state.Dash.Instructor.Home.CourseSection.lastCourseSession,
  hasLastCourseSessionError: state.Dash.Instructor.Home
    .CourseSection.lastCourseSessionError,
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
    dispatch(AttendanceActions.clear());
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
  },
  changeFilter: (filter) => {
    dispatch(HomeCoursesActions.changeFilter(filter));
  },
  showOverlay: (overlayType) => {
    dispatch(OverlayActions.setOverlayType(overlayType));
    dispatch(OverlayActions.showOverlay());
  },
  hideOverlay: () => {
    dispatch(OverlayActions.clearOverlayType());
    dispatch(OverlayActions.hideOverlay());
  },
  chooseCourse: (course) => {
    dispatch(setSelectedCourse(course));
  },
  clearChosenCourse: () => {
    dispatch(clearSelectedCourse())
  },
  panelLoadingOn: () => {
    dispatch(setCourseSectionPanelLoadingOn());
  },
  panelLoadingOff: () => {
    dispatch(setCourseSectionPanelLoadingOff());
  },
  setLastCourseSession: (courseSession) => {
    dispatch(setCourseSectionLastCourseSession(courseSession));
  },
  clearLastCourseSession: () => {
    dispatch(clearCourseSectionLastCourseSession());
  },
  setLastCourseSessionError: () => {
    dispatch(setCourseSectionError());
  },
  clearLastCourseSessionError: () => {
    dispatch(clearCourseSectionError());
  }


});

Home = connect(
  stateToProps,
  dispatchToProps,
)(Home);


export default Home;
