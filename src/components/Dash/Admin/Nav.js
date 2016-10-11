/**
 * @author Anthony Altieri on 9/23/16.
 */

import React, { Component } from 'react';
import * as UserActions from '../../../actions/User'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logOut } from '../../../api/User';
import { toastr } from 'react-redux-toastr';

class Nav extends Component {
  componentDidMount() {
    const { navigate, isLoggedIn } = this.props;
    if (!isLoggedIn) navigate('/login/');
  }

  render() {
    const { navigate, path, logOutAction } = this.props;
    return (
    <div
      className="nav"
    >
      <a
        className="sidenav-button"
        onClick={() => {
          logOut()
            .then((result) => {
              toastr.success('Logged out');
              logOutAction();
              navigate('/login/');
            })
            .catch((error) => {
              toastr.error('Error logging out');
            })
        }}
      >
        LOG OUT
      </a>
      <hr />
      <h2 className="section-title">COURSES</h2>
      <a
        className={path !== '/dash/admin/addCourse'
          ? 'sidenav-button'
          : 'sidenav-button-active'
        }
        onClick={() => {
          navigate('/dash/admin/addCourse')
        }}
      >
        ADD
      </a>
      <a
        className={path !== '/dash/admin/deleteCourse'
          ? 'sidenav-button'
          : 'sidenav-button-active'
        }
        onClick={() => {
          navigate('/dash/admin/deleteCourse')
        }}
      >
        DELETE
      </a>
      <a
        className={path !== '/dash/admin/getCourses'
          ? 'sidenav-button'
          : 'sidenav-button-active'
        }
        onClick={() => {
          navigate('/dash/admin/getCourses')
        }}
      >
        GET
      </a>
      <hr />
      <h2 className="section-title">USERS</h2>
      <a
        className={path !== '/dash/admin/addUser'
          ? 'sidenav-button'
          : 'sidenav-button-active'
        }
        onClick={() => {
          navigate('/dash/admin/addUser')
        }}
      >
        ADD
      </a>
      <a
        className={path !== '/dash/admin/getUsers'
          ? 'sidenav-button'
          : 'sidenav-button-active'
        }
        onClick={() => {
          navigate('/dash/admin/getUsers')
        }}
      >
        GET
      </a>
    </div>
  )
  }
}
Nav = connect(
  (state) => ({
    path: state.routing.locationBeforeTransitions.pathname,
    isLoggedIn: state.User.isLoggedIn,
  }),
  (dispatch) => ({
    navigate: (url) => {
      dispatch(push(url))
    },
    logOutAction: () => {
      dispatch(UserActions.logOut());
    },
    dispatch,
  }),
)(Nav);

export default Nav;