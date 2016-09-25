/**
 * @author Anthony Altieri on 9/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
import CourseList from './CourseList/CourseList';
import { logOut } from '../../../actions/User';
import { setVisiblityFilter } from '../../../actions/VisibleCourseFilter';
import { push } from 'react-router-redux';

class DashCourses extends Component {
  componentWillMount() {
    const { params } = this.props;
    console.log('params', params)
  }

  render() {
    return (
      <div className="dash-courses fullscreen">
        <Nav {...this.props} />
        <CourseList {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filter: state.CourseList.VisibleCourseFilter,
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
      dispatch(logOut());
    },
    dispatch,
  }
};
DashCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashCourses);


export default DashCourses;