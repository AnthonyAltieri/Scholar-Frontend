/**
 * @author Anthony Altieri on 10/3/16.
 */

import React from 'react';
import { hideOverlay } from '../../../actions/Overlay';
import { end, start } from '../../../api/CourseSession';
import { toastr } from 'react-redux-toastr';
import ButtonRound from '../../buttons/ButtonRound';

const Overlay = ({
  courseId,
  dispatch,
  hasCourseSession,
  startedCourseSession,
  endedCourseSession,
}) => {
  return (
    <div className="overlay">
      <div
        className="card"
        style={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-around',
        }}
      >
        <p
          className="text"
          style={{
            textAlign: "center",
          }}
        >
          {hasCourseSession
            ? 'Do you really want to end the Course Session?'
            : 'Do you want to start a Course Session?'
          }
        </p>
        <div
          className="r-center"
        >
          <ButtonRound
            className="background-green"
            style={{
              minWidth: "100px",
              margin: "12px 8px"
            }}
            onClick={() => {
              if (hasCourseSession) {
                end(courseId)
                  .then((result) => {
                    toastr.success('Course Session ended successfully');
                    endedCourseSession();
                    dispatch(hideOverlay());
                  })
                  .catch((error) => {
                    toastr.error('Something went wrong please try again');
                  })
                return;
              }
              console.log('courseId', courseId);
              start(courseId)
                .then((result) => {
                  const { id } = result;
                  toastr.success('Course Session started successfully');
                  startedCourseSession(id);
                  dispatch(hideOverlay());
                })
                .catch((error) => {
                  console.log('start, error', error);
                  toastr.error('Something went wrong please try again');
                })
            }}
          >
            YES
          </ButtonRound>
          <ButtonRound
            className="background-red"
            style={{
              minWidth: "100px",
              margin: "12px 8px"
            }}
            onClick={() => {
              dispatch(hideOverlay());
            }}
          >
            NO
          </ButtonRound>
        </div>
      </div>
    </div>

  );
};

export default Overlay;
