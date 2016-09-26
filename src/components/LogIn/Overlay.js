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
        <ButtonRound
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
          className="background-white color-bright"
          style={{
            border: "solid 2px #FF7C6B",
          }}
          onClick={() => {
            dispatch(hideOverlay());
          }}
        >
          CANCEL
        </ButtonRound>
      </div>
    </div>

  );
};

export default Overlay;
