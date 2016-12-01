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
}) => {
  let nav = null;
  const courseRegex = /^\/dash\/instructor\/course\/*/;
  const homeRegex = /^\/dash\/instructor\/home/;

  if (courseRegex.test(pathname)) {
    nav = (<CourseNav
      navigate={navigate}
      courseAbbreviation={courseAbbreviation}
      setMode={setMode}
      showOverlay={showOverlay}
      isCourseSessionActive={isCourseSessionActive}
    />)
  } else if (homeRegex.test(pathname)) {
    nav = <HomeNav navigate={navigate} />
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
