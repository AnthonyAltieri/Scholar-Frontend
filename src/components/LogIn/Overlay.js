/**
 * @author Anthony Altieri on 9/26/16.
 */

import React from 'react';
import { toastr } from 'react-redux-toastr';
import { hideOverlay } from '../../actions/Overlay';
import { resetPassword } from '../../api/User';
import ButtonRound from '../buttons/ButtonRound';

const Overlay = ({
  dispatch,
}) => {
  let username;
  return (
    <div className="overlay"
    >
      <div className="card">
        <p
          className="text"
          style={{
            textAlign: "center",
          }}
        >
          Enter the email associated with your account.
        </p>
        <input
          type="text"
          name="username"
          placeholder="Enter your email"
          ref={(n) => { username = n }}
        />
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
              resetPassword(username.value)
                .then(() => {
                  username.value = '';
                  toastr.success('Password reset email sent');
                  dispatch(hideOverlay());
                })
                .catch(() => {
                  toastr.error('Something went wrong please try again');
                })
            }}
          >
            SUMBIT
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

  );
};

export default Overlay;
