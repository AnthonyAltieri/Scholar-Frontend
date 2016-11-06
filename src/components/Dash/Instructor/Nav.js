/**
 * @author Anthony Altieri on 10/3/16.
 */

import React from 'react';
import NavBtn from './NavBtn';
import * as Overlay from '../../../actions/Overlay';
import { push } from 'react-router-redux';
import { start, end } from '../../../api/CourseSession';
import { toastr } from 'react-redux-toastr';

const Nav = ({
  sessionActive,
  dispatch,
  hasCourseSession,
  courseId,
  courseCode,
}) => {
  return (
    <div className="side-nav">
      <img
        className="logo"
        src={require('../../../img/App/logo-dark.svg')}
      />
      <p className="code">{courseCode}</p>
      <ActiveBar
        hasCourseSession={hasCourseSession}
      />
      <NavBtn
        iconSrc={require('../../../img/power.svg')}
        onClick={() => {
          dispatch(Overlay.showOverlay());
        }}
      />
      <p className="label">session</p>
      <NavBtn
        iconSrc={require('../../../img/settings.svg')}
        onClick={() => {
          dispatch(push('/dash/instructor/settings'))
        }}
      />
      <p className="label">settings</p>
      <NavBtn
        iconSrc={require('../../../img/group.svg')}
      />
      <p className="label">attendance</p>
      <hr
        style={{
          marginTop: "16px"
        }}
      />
      <h3 className="title">ALERT</h3>
      <NavBtn
        iconSrc={require('../../../img/question.svg')}
        onClick={() => {
          dispatch(push('/dash/instructor/confusion'))
        }}
      />
      <hr />
      <h3 className="title">ASK</h3>
      <NavBtn
        iconSrc={require('../../../img/chat.svg')}
        onClick={() => {
          dispatch(push('/dash/instructor/ask'))
        }}
      />
      <hr />
      <h3 className="title">ASSESS</h3>
      <NavBtn
        iconSrc={require('../../../img/thunder.svg')}
      />
      <p className="label">instant</p>
      <NavBtn
        iconSrc={require('../../../img/brain.svg')}
      />
      <p className="label">reflective</p>
    </div>
  );
};

const ActiveBar = ({
  hasCourseSession,
}) => {
  return (
    <div
      className={'active-bar' + (hasCourseSession ? '' : ' inactive')}
    >
      <p className="text">
        {hasCourseSession ? 'ACTIVE' : 'INACTIVE'}
        </p>
    </div>
  );
};

export default Nav;
