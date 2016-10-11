/**
 * @author Anthony Altieri on 9/28/16.
 */

import React from 'react';
import { hideOverlay } from '../../../actions/Overlay';
import { addCourse } from '../../../api/Course';
import { toastr } from 'react-redux-toastr';
import ButtonRound from '../../../components/buttons/ButtonRound';

const handleAddCode = (result) => {
  if (!result) {
    toastr.error('Invalid code');
    return;
  }
  if (result.alreadyEnrolled) {
    toastr.info('Course has already been added');
    return;
  }
  if (!!result.id) {
    toastr.success('Course added successfully');
    return;
  }
  toastr.error('Something went wrong please try again');
};

const Overlay = ({
  dispatch,
  userId,
}) => {
  let code;

  return (
    <div className="overlay">
      <div className="card">
        <div className="content">
          Enter a code to add a class
        </div>
        <input
          className="input"
          ref={(n) => { code = n; }}
        />
        <div className="r-center">
          <ButtonRound
            className="background-green"
            style={{
              minWidth: "100px",
              margin: "12px 8px"
            }}
            onClick={() => {
              const value = code.value;
              if (!value) return;
              console.log('code', value);
              if (value.length != 8) {
                toastr.error('Invalid code');
                return;
              }
              console.log('userId', userId)
              addCourse(value, userId)
                .then((result) => {
                  handleAddCode(result);
                })
                .catch((error) => {
                  console.log('error', error);
                  toastr.error('Something went wrong', 'Please try again');
                })

            }}
          >
            ADD
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
            CANCEL
          </ButtonRound>
        </div>
      </div>
    </div>
  )
};

export default Overlay;