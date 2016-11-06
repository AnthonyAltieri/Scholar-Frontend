/**
 * @author Anthony Altieri on 9/26/16.
 */

import React from 'react';
import { toastr } from 'react-redux-toastr';
import { hideOverlay } from '../../actions/Overlay';
import { resetPassword } from '../../api/User';
import ButtonRound from '../buttons/ButtonRound';
import TextField from '../TextField';

const Overlay = ({
  dispatch,
}) => {
  let email;
  return (
    <div className="overlay"
    >
      <div
        className="card"
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-between",
          minHeight: "260px",
          minWidth: "282px",
        }}
      >
        <p
          className="text"
          style={{
            textAlign: "center",
          }}
        >
          Enter the email associated with your account.
        </p>
        <TextField
          floatingLabelText="Enter your email"
          type="text"
          onChange={(event) => {
            email = event.target.value;
          }}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            bottom: "12px",
          }}
        />
        <div
          className="r-center"
          style={{
            position: "relative",
            bottom: "6px",
          }}
        >
          <ButtonRound
            className="background-green"
            style={{
              minWidth: "100px",
              margin: "12px 8px"
            }}
            onClick={() => {
              if (!email) {
                toastr.info('Enter a valid email');
              }
              resetPassword(email.value)
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
