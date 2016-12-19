/**
 * @author Anthony Altieri on 10/3/16.
 */

import React from 'react';
import CourseNav from './CourseNav';
import HomeNav from './HomeNav';

const Nav = ({
  pathname,
  isCourseSessionActive,
  courseAbbreviation,
  setMode,
  showOverlay,
  navigate,
  clearCourse,
  logOut,
}) => {
  let nav = null;
  const courseRegex = /^\/dash\/instructor\/course\/*/;
  const homeRegex = /^\/dash\/instructor\/home/;
  const settingsRegex = /^\/dash\/instructor\/settings/;
  const gradesRegex = /^\/dash\/instructor\/grades/;

  if (courseRegex.test(pathname)) {
    nav = (<CourseNav
      navigate={navigate}
      courseAbbreviation={courseAbbreviation}
      setMode={setMode}
      showOverlay={showOverlay}
      isCourseSessionActive={isCourseSessionActive}
      clearCourse={clearCourse}
    />)
  } else if (homeRegex.test(pathname)
      || settingsRegex.test(pathname)
      || gradesRegex.test(pathname)
    ) {
    nav = <HomeNav navigate={navigate} logOut={logOut} />
  }

  return (
    <div className="side-nav">
      <img
        className="logo"
        src={require('../../../../img/App/logo-dark.svg')}
      />
      {nav}
    </div>
  );
};


export default Nav;
