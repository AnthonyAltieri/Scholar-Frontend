/**
 * @author Anthony Altieri on 12/28/16.
 */

import RaisedButton from 'material-ui/RaisedButton';
import BlueRaisedButton from '../../../buttons/BlueRaisedButton';
import React from 'react';
import Colors from '../../../../util/Colors';
const moment = require('moment');

const PanelSelectedCourse = ({
  title,
  abbreviation,
  isLoading,
  lastCourseSession,
  hasLastCourseSessionError,
  onClickViewCourseSessions,
  onClickEnterCourse,
  hasActiveCourseSession,
}) => {
  let lastCourseSessionDate = ''
  let howLongAgo = ' ';
  if (!!hasLastCourseSessionError) {
    lastCourseSessionDate = 'ERROR PLEASE TRY AGAIN';
  } else if (!lastCourseSession && !hasLastCourseSessionError) {
    lastCourseSessionDate = 'NONE';
  } else {
    // TODO: factor timezones in here
    lastCourseSessionDate = moment(lastCourseSession.created)
      .format('dddd, MMMM Do YYYY');
    howLongAgo = moment(lastCourseSession.created).fromNow();
  }
  return (
    <div className="panel-selected-course">
      <div
        className="r-left fullwidth"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <p className="selected-course-label">Selected Course:</p>
        <p className="selected-course">({abbreviation})</p>
        <p className="selected-course">{title}</p>
      </div>
      {!!isLoading
        ? (
          <div
            className="sk-three-bounce r"
            style={{
              margin: 'auto 0',
              height: 56,
            }}
          >
            <div className="sk-child sk-bounce1 background-bright"></div>
            <div className="sk-child sk-bounce2 background-bright"></div>
            <div className="sk-child sk-bounce3 background-bright"></div>
          </div>
        )
        : (
          <div className="c fullwidth">
            <div className="r-left fullwidth">
              <p className="selected-course-info-label">Last Course Session:</p>
              <p className="selected-course-info">{lastCourseSessionDate}</p>
              {(lastCourseSessionDate !== 'NONE'
                && lastCourseSessionDate !== 'ERROR PLEASE TRY AGAIN')
                ? (
                  <p
                    className="selected-course-info"
                    style={{
                    color: hasActiveCourseSession ? Colors.green : Colors.red,
                    marginLeft: 4,
                  }}
                  >
                    {hasActiveCourseSession ? '[Active]' : '[Inactive]'}
                  </p>
                )
                : null
              }
            </div>
            <div className="r-left fullwidth" style={{ height: 31.25, }}>
              { /** <p className="selected-course-info">{howLongAgo}</p> */}
            </div>
          </div>
        )
      }
      <br />
      <div className="r-right fullwidth">
        {/*
          <BlueRaisedButton
            label="View Course Sessions"
            disabled={!!isLoading}
            onTouchTap={onClickViewCourseSessions}
          />
        */}
        <RaisedButton
          secondary
          style={{
            marginLeft: 8,
          }}
          disabled={!!isLoading}
          label="Enter Course"
          onTouchTap={onClickEnterCourse}
        />
      </div>
    </div>
  );
};

export default PanelSelectedCourse;
