/**
 * @author Anthony Altieri on 9/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

let Nav = ({
  navigate,
  path,
}) => (
  <div
    className="nav"
  >
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
);
Nav = connect(
  (state) => ({
    path: state.routing.locationBeforeTransitions.pathname,
  }),
  (dispatch) => ({
    navigate: (url) => {
      dispatch(push(url))
    }
  }),
)(Nav);

export default Nav;