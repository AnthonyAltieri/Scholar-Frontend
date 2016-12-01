/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import NavBtn from './NavBtn';

const IMG_PATH = '../../../../img';
// require('../../../../img')

const ActiveBar = ({
  isCourseSessionActive,
  showOverlay,
}) => {
    return (
      <div className="c-center">
        <p
          style={{
            margin: "4px auto",
            textAlign: "center",
          }}
        >
          Course Session
        </p>
        <div
          className={'active-bar' + (isCourseSessionActive? '' : ' inactive')}
        >
          <p className="text">
            {isCourseSessionActive? 'ACTIVE' : 'INACTIVE'}
          </p>
        </div>

      </div>
    );
};

const CourseNav = ({
  navigate,
  setMode,
  showOverlay,
  isCourseSessionActive,
  courseAbbreviation,
}) => {

  return (
    <div className="c">
      <br />
      <ActiveBar
        isCourseSessionActive={isCourseSessionActive}
      />
      <h2 className="code">{courseAbbreviation}</h2>
      <NavBtn
        icon="home"
        label="home"
        onClick={() => {
          navigate('/dash/instructor/home')
        }}
      />
      <NavBtn
        icon="settings"
        label="settings"
        onClick={() => {
          setMode('SETTINGS')
        }}
      />
      <NavBtn
        icon="power_settings_new"
        label="session"
        onClick={() => {
          showOverlay('COURSE_SESSION');
        }}
      />
      <NavBtn
        icon="dashboard"
        label="main"
        onClick={() => {
          setMode('MAIN')
        }}
      />
      <NavBtn
        icon="chat"
        label="ask"
        onClick={() => {
          setMode('ASK')
        }}
      />
      <NavBtn
        icon="priority_high"
        label="alert"
        onClick={() => {
          setMode('ALERT')
        }}
      />
      <NavBtn
        icon="content_paste"
        label="assess"
        onClick={() => {
          setMode('ASSESS')
        }}
      />
    </div>
  );
};

export default CourseNav;
