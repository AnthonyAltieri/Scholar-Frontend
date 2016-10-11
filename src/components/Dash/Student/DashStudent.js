/**
 * @author Anthony Altieri on 9/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activateAlert, acknowledgeAlert } from '../../../actions/Overlay';
import { setDashMode } from '../../../actions/DashStudent';
import { setView } from '../../../actions/View';
import Content from './Content';
import Overlay from '../../Overlay/Overlay';
import Nav from '../../Navigation/DashStudent/Nav';

let DashStudent = (props) => {
  const { mode, code, courseSessionId, onAlertClick,
    onConfirmClick, onAskInactiveClick, onAskActiveClick,
    onBackQuestionsClick, onBackCoursesClick, children,
    params
  }  = props;
  switch (mode) {
    case 'QUESTIONS':
    case 'ASK': {
      return (
        <div className="dash-student">
          <Nav
            {...props}
            mode={mode}
            code={code}
            onAlertClick={onAlertClick}
            onAskClick={mode === 'ASK'
              ? onAskActiveClick
              : onAskInactiveClick
            }
            onBackClick={mode === 'QUESTIONS'
              ? onBackCoursesClick
              : onBackQuestionsClick
            }
            courseSessionId={courseSessionId}
          />
          {children}
        </div>
      );
    }

    case 'ALERT': {
      return (
        <div className="dash-student">
          <Overlay
            onConfirmClick={onConfirmClick}
            cardText="Your Confusion Alert has been received."
            buttonText="Ok"
          />
          <Nav
            mode={mode}
            code={code}
            onAlertClick={onAlertClick}
          />
          <Content mode={mode} />
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    mode: state.CourseSession.mode || 'QUESTIONS',
    code: state.CourseSession.code || '',
    showOverlay: state.CourseSession.showOverlay,
    courseSessionId: state.CourseSession.id,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackQuestionsClick: () => {
      dispatch(setDashMode('QUESTIONS'))
    },
    onBackCoursesClick: () => {
      console.log('onBackCoursesClick')
      dispatch(setView('DASH_COURSES'))
    },
    onAlertClick: () => {
      dispatch(activateAlert());
    },
    onAskInactiveClick: () => {
      dispatch(setDashMode('ASK'));
    },
    onAskActiveClick: () => {
      dispatch(setDashMode('QUESTIONS'))
    },
    onConfirmClick: () => {
      dispatch(acknowledgeAlert());
    },
  }
};

DashStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashStudent);

export default DashStudent;