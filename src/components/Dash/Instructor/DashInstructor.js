/**
 * @author Anthony Altieri on 10/3/16.
 */

import React, { Component } from 'react';
import Nav from './Nav/Nav';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as LoadingActions from '../../../actions/Loading'
import * as CourseSessionActions from '../../../actions/CourseSession'
import * as ModeActions from '../../../actions/DashInstructor/Course/Mode'
import * as OverlayActions from '../../../actions/Overlay';
import * as CourseActions from '../../../actions/Course';
import * as UserActions from '../../../actions/User';
import * as DrawerActions from '../../../actions/Drawer';
import Colors from '../../../util/Colors';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';


class DashInstructor extends Component {
  componentDidMount() {
    const { endLoading } = this.props;
    endLoading();
  }

  render() {
    const {
      children,
      pathname,
      isCourseSessionActive,
      courseAbbreviation,
      courseId,
      setMode,
      showOverlay,
      navigate,
      clearCourse,
      logOut,
      abbreviation,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      mode,
      name,
    } = this.props;

    const courseRegex = /^\/dash\/instructor\/course\/*/;
    const homeRegex = /^\/dash\/instructor\/home/;
    const settingsRegex = /^\/dash\/instructor\/settings/;
    const gradesRegex = /^\/dash\/instructor\/grades/;
    let menu = null;
    let title = null;

    if (courseRegex.test(pathname)) {
      title = abbreviation;
      menu = (
        <div>
          <div
            className={'active-bar ' + (isCourseSessionActive
              ? 'active'
              : 'inactive')
            }
          >
            <h3>Course Session Is</h3>
            <p>{isCourseSessionActive ? 'Active' : 'Inactive'}</p>
          </div>

          <MenuItem primaryText="Home"
            rightIcon={
              <FontIcon className="material-icons">
                home
              </FontIcon>
            }
            onTouchTap={() => {
              navigate('/dash/instructor/home')
              closeDrawer();
              clearCourse();
            }}
          />
          <MenuItem primaryText="Course Session"
            rightIcon={
              <FontIcon className="material-icons">
                power_settings_new
              </FontIcon>
            }
            onTouchTap={() => showOverlay('COURSE_SESSION')}
          />
          <MenuItem primaryText="Main"
            rightIcon={
              <FontIcon className="material-icons">
                dashboard
              </FontIcon>
            }
            onTouchTap={() => {
              if (mode === 'MAIN') return;
              setMode('MAIN');
              closeDrawer();
            }}
          />
          <MenuItem primaryText="Ask"
            rightIcon={
              <FontIcon className="material-icons">
                chat
              </FontIcon>
            }
            onTouchTap={() => {
              if (mode === 'ASK') return;
              setMode('ASK')
              closeDrawer();
            }}
          />
          <MenuItem
            primaryText="Alert"
            rightIcon={
              <FontIcon className="material-icons">
                priority_high
              </FontIcon>
            }
            onTouchTap={() => {
              if (mode === 'ALERT') return;
              setMode('ALERT')
              closeDrawer();
            }}
          />
          <MenuItem
            primaryText="Assess"
            rightIcon={
              <FontIcon className="material-icons">
                school
              </FontIcon>
            }
            onTouchTap={() => {
              if (mode === 'ASSESS') return;
              setMode('ASSESS')
              closeDrawer();
            }}
          />
          <MenuItem
            primaryText="Assessment Bank"
            rightIcon={
              <FontIcon className="material-icons">
                monetization_on
              </FontIcon>
            }
            onTouchTap={() => {
              if (mode === 'QUESTION_BANK') return;
              setMode('QUESTION_BANK')
              closeDrawer();
            }}
          />
          <MenuItem
            primaryText="Attendance"
            rightIcon={
              <FontIcon className="material-icons">
                pan_tool
              </FontIcon>
            }
            onTouchTap={() => showOverlay('ATTENDANCE')}
          />
        </div>
      );
    } else if (homeRegex.test(pathname)
        || settingsRegex.test(pathname)
        || gradesRegex.test(pathname)
      ) {
      title = 'Home';
      if (homeRegex.test(pathname)) {
        title = 'Home';
      } else if (gradesRegex.test(pathname)) {
        title = 'Grades';
      } else {
        title = 'Settings';
      }
      menu = (
        <div>
          <div className="c-center">
            <p>Hello {name}</p>
          </div>
          <MenuItem
            primaryText="Log Out"
            rightIcon={
              <FontIcon className="material-icons">
                exit_to_app
              </FontIcon>
            }
            onTouchTap={() => {
              logOut();
              navigate('/login');
            }}
          />
          <MenuItem
            primaryText="Home"
            rightIcon={
              <FontIcon className="material-icons">
                home
              </FontIcon>
            }
            onTouchTap={() => {
              navigate('/dash/instructor/home')
              closeDrawer();
            }}
          />
          <MenuItem
            primaryText="Grades"
            rightIcon={
              <FontIcon className="material-icons">
                school
              </FontIcon>
            }
            onTouchTap={() => {
              navigate('/dash/instructor/grades');
              closeDrawer();
            }}
          />
        </div>

      );
    }

    return (
      <div className="dash-instructor">
        {/* <Nav
          courseAbbreviation={courseAbbreviation}
          isCourseSessionActive={isCourseSessionActive}
          pathname={pathname}
          navigate={navigate}
          courseId={courseId}
          setMode={setMode}
          showOverlay={showOverlay}
          clearCourse={clearCourse}
          logOut={logOut}
        /> */}
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={() => openDrawer()}
          iconElementRight={
            (title === 'Home' || title === 'Grades' || title === 'Settings')
              ? null
              : (
                <div
                  className="r"
                  style={{
                    background: 'white',
                    padding: 12,
                    borderRadius: 2,
                  }}
                >
                  <p
                    className="no-text-sel"
                    style={{
                      margin: '0 4px 0 0',
                      color: isCourseSessionActive
                        ? Colors.green
                        : Colors.red,
                    }}
                  >
                    Course Session
                    {isCourseSessionActive ? ' Active' : ' Inactive'}
                  </p>
                  <FontIcon
                    className="material-icons"
                    style={{
                      color: isCourseSessionActive
                        ? Colors.green
                        : Colors.red,
                    }}
                  >
                    brightness_1
                  </FontIcon>
                </div>
              )
            }
        />
        <Drawer
          open={isDrawerOpen}
          docked={false}
          onRequestChange={(open, reason) => {
            if (!open) {
              closeDrawer();
            }
          }}
        >
          {menu}
        </Drawer>
        {children}
      </div>
    );
  }
}

const stateToProps = (state) => ({
  name: state.User.name,
  mode: state.Dash.Instructor.Course.Mode,
  abbreviation: state.Course.abbreviation || null,
  courseId: !!state.User.inCourse ? state.User.inCourse.id : null,
  isCourseSessionActive: !!state.Course.activeCourseSessionId,
  courseAbbreviation: state.Course.abbreviation,
  pathname: state.routing.locationBeforeTransitions.pathname,
  isDrawerOpen: !!state.Drawer.isOpen,
});
const dispatchToProps = (dispatch) => ({
  endLoading: () => {
    dispatch(LoadingActions.endLoading());
  },
  startedCourseSession: (id) => {
    dispatch(CourseSessionActions.startedCourseSession(id))
  },
  endedCourseSession: () => {
    dispatch(CourseSessionActions.endedCourseSession());
  },
  setMode: (mode) => {
    dispatch(ModeActions.setMode(mode));
  },
  navigate: (url) => {
    dispatch(push(url));
  },
  showOverlay: (type) => {
    dispatch(OverlayActions.setOverlayType(type));
    dispatch(OverlayActions.showOverlay());
  },
  clearCourse: () => {
    dispatch(CourseActions.clearCourse());
  },
  logOut: () => {
    dispatch(UserActions.logOut());
  },
  openDrawer: () => {
    dispatch(DrawerActions.openDrawer());
  },
  closeDrawer: () => {
    dispatch(DrawerActions.closeDrawer())
  },

});

DashInstructor = connect(
  stateToProps,
  dispatchToProps
)(DashInstructor);


export default DashInstructor;
