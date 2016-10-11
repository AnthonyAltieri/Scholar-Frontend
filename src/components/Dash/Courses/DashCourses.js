/**
 * @author Anthony Altieri on 9/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import ButtonFab from '../../buttons/ButtonFab';
import CourseList from './CourseList/CourseList';
import Overlay from './Overlay';
import { logOut } from '../../../api/User';
import { setVisiblityFilter } from '../../../actions/VisibleCourseFilter';
import * as OverlayActions from '../../../actions/Overlay';
import * as LoadingActions from '../../../actions/Loading'
import * as UserActions from '../../../actions/User'
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { fetchCourses } from '../../../api/Courses';
import * as CourseListActions from '../../../actions/CourseList';

class DashCourses extends Component {
  componentDidMount() {
    const { isLoggedIn, navigate, endLoading } = this.props;
    if (!isLoggedIn) {
      navigate('/login/');
      return;
    }

    if (this.props.isLoggedIn) {
      const { filter } = this.props.params;
      console.log('fiter', filter)
      if (!filter) {
        this.props.dispatch(push('/dash/courses/active'));
        return;
      }
      fetchCourses(this.props.params.filter, this.props.userId)
        .then((courses) => {
          this.props.dispatch(CourseListActions.receivedCourses(courses));
          this.forceUpdate();
        })
    }

    endLoading();
  }

  render() {
    const { showOverlay, isOverlayVisible, dispatch, userId } = this.props;
    return (
      <div className="dash-courses fullscreen">
        {isOverlayVisible
          ? <Overlay
              dispatch={dispatch}
              userId={userId}
            />
          : ''}
        <Nav {...this.props} />
        <CourseList {...this.props} />
        <ButtonFab
          position="br"
          className="background-bright"
          onClick={() => {
            showOverlay()
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOverlayVisible: state.Overlay.isVisible,
    filter: state.CourseList.VisibleCourseFilter,
    isLoggedIn: state.User.isLoggedIn,
    userId: state.User.id,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onActiveClick: () => {
      dispatch(setVisiblityFilter('active'));
      dispatch(push('/dash/courses/active'));
    },
    onInactiveClick: () => {
      dispatch(setVisiblityFilter('inactive'));
      dispatch(push('/dash/courses/inactive'));
    },
    onLogoutClick: () => {
      logOut()
        .then(() => {
          toastr.success('Log Out Successful');
          dispatch(UserActions.logOut());
          dispatch(push('/login'));
        })
        .catch((error) => {
          console.log('error', error);
          toastr.error('Something went wrong with logout please try again');
        })
    },
    endLoading: () => {
      dispatch(LoadingActions.endLoading());
    },
    showOverlay: () => {
      dispatch(OverlayActions.showOverlay());
    },
    hideOverlay: () => {
      dispatch(OverlayActions.hideOverlay());
    },
    navigate: (url) => {
      dispatch(push(url))
    },
    dispatch,
  }
};
DashCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashCourses);


export default DashCourses;