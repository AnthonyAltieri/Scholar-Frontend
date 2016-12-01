/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import { toastr } from 'react-redux-toastr';
import { referralCodeCheck } from '../../api/Referral';
import TextField from '../TextField';
import ButtonRound from '../buttons/ButtonRound';
import ButtonClear from '../buttons/ButtonClear';

const REFERRAL_CODE_LENGTH = 6;

const isValidReferralCode = (code) => {
  if (!code || code.length !== REFERRAL_CODE_LENGTH) {
    toastr.info(
      'Invalid Referral Code',
      'You can get one from a Student Representative',
    );
    return false;
  }
  return true;
};

const ReferralCodeScreen = ({
  setReferralCode,
}) => {
  let referralCode = '';
  return (
    <div
      className="sign-up-instructor fullscreen background-primary c-center"
    >
      <div className="card">
        <h2
          className="header"
          style={{
              position: "relative",
              bottom: "8px"
            }}
        >
          Enter Referral Code
        </h2>
        <TextField
          floatingLabelText="code"
          onChange={(event) => {
              referralCode = event.target.value;
            }}
        />
        <ButtonRound
          style={{
              position: "relative",
              top: "12px",
            }}
          green
          onClick={() => {
              if (isValidReferralCode(referralCode)) {
                referralCodeCheck(referralCode)
                  .then((payload) => {
                    const { error, referralCode } = payload;
                    if (!error) {
                      toastr.error('Something went wrong please try again');
                      return;
                    }
                    if (!referralCode) {
                      toastr.info('Referral Code not found');
                      return;
                    }
                    toastr.success('Referral Code successfully applied');
                    setReferralCode(referralCode);
                  })
              }
            }}
        >
          SUBMIT
        </ButtonRound>
        <ButtonClear
          style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              position: "relative",
              top: "34px",
            }}
          black
          onClick={() => {
              window.location = 'https://crowdconnect.io';
            }}
        >
          EXIT
        </ButtonClear>
      </div>
    </div>
  );
};

export default ReferralCodeScreen;


