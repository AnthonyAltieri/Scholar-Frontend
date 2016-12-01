/**
 * @author Anthony Altieri on 9/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import CourseList from './CourseList/CourseList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import AddCourseDialog from './AddCourseDialog';
import LogOutDialog from './LogOutDialog';
import { logOut } from '../../../api/User';
import * as OverlayActions from '../../../actions/Overlay';
import * as LoadingActions from '../../../actions/Loading'
import * as CoursesActions from '../../../actions/Dash/Courses/Courses'
import * as UserActions from '../../../actions/User'
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { getByUser as getCoursesByUser } from '../../../api/Courses';


async function handleGetCourses(
  userId,
  receivedCourses
) {
  try {
    const { error, courses } = await getCoursesByUser(userId);
    if (!!error) {
      console.error('error: ', error);
      toastr.error('Something went wrong please refresh the page');
      return;
    }
    receivedCourses(courses);
  } catch (e) {
    console.error('error: ', e);
    toastr.error('Something went wrong please refresh the page');
  }
}

class DashCourses extends Component {
  componentDidMount() {
    const {
      userId,
      navigate,
      endLoading,
      receivedCourses,
      setVisibilityFilter,
    } = this.props;
    if (!userId) {
      navigate('/login/');
      return;
    }

    const { filter } = this.props.params;
    console.log('filter', filter);
    if (!filter) {
      navigate('/dash/courses/active');
      return;
    }
    setVisibilityFilter(filter);

    handleGetCourses(userId, receivedCourses);
    endLoading();
  }

  render() {
    const {
      showOverlay,
      hideOverlay,
      isOverlayVisible,
      onActiveClick,
      onInactiveClick,
      filter,
      userId,
      overlayType,
    } = this.props;
    return (
      <div className="dash-courses fullscreen">
        <AddCourseDialog
          isOpen={isOverlayVisible && overlayType === 'ADD_COURSE'}
          onCancelClick={() => { hideOverlay() }}
          onSendClick={() => {
          }}
        />
        <LogOutDialog
          isOpen={isOverlayVisible && overlayType === 'LOG_OUT'}
          onYesClick={() => {
          }}
          onNoClick={() => { hideOverlay() }}
        />
        <Nav
          onActiveClick={onActiveClick}
          onInactiveClick={onInactiveClick}
          filter={filter}
          onLogoutClick={() => { showOverlay('LOG_OUT') }}
        />
        <CourseList />
        <FloatingActionButton
          style={{
            position: "absolute",
            bottom: "30px",
            right: "16px",
          }}
          className="background-bright"
          secondary
          onClick={() => { showOverlay('ADD_COURSE') }}
        >
          <FontIcon className="material-icons">
           add
          </FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filter: state.Courses.filter,
    isOverlayVisible: state.Overlay.isVisible,
    overlayType: state.Overlay.type,
    isLoggedIn: state.User.isLoggedIn,
    userId: state.User.id,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onActiveClick: () => {
      if (ownProps.params.filter === 'active') return;
      dispatch(CoursesActions.setVisibilityFilter('active'));
      dispatch(push('/dash/courses/active'));
    },
    onInactiveClick: () => {
      if (ownProps.params.filter === 'inactive') return;
      dispatch(CoursesActions.setVisibilityFilter('inactive'));
      dispatch(push('/dash/courses/inactive'));
    },
    onLogoutClick: () => {
      dispatch(UserActions.logOut());;
      dispatch(push('/login'));
    },
    endLoading: () => {
      dispatch(LoadingActions.endLoading());
    },
    showOverlay: (overlayType) => {
      dispatch(OverlayActions.setOverlayType(overlayType));
      dispatch(OverlayActions.showOverlay());
    },
    hideOverlay: () => {
      dispatch(OverlayActions.clearOverlayType());
      dispatch(OverlayActions.hideOverlay());
    },
    receivedCourses: (courses) => {
      dispatch(CoursesActions.receivedCourses(courses))
    },
    setVisibilityFilter: (filter) => {
      dispatch(CoursesActions.setVisibilityFilter(filter));
    },
    navigate: (url) => {
      dispatch(push(url))
    },
  }
};
DashCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashCourses);


export default DashCourses;