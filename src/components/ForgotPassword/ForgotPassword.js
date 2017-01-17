/**
 * @flow
 * @author Anthony Altieri on 1/16/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import TextField from '../TextField';
import GreenRaisedButton from '../buttons/GreenRaisedButton';
import * as LoadingActions from '../../actions/Loading'
import { changePassword } from '../../api/User';

class ForgotPassword extends Component {
  componentDidMount() {
    const { params, navigate, endLoading } = this.props;
    console.log('params', params);
    if (!params || !params.id) {
      navigate('/login')
    }
    endLoading();
  }

  render() {
    const {
      params,
      navigate,
    } = this.props;
    const forgotPasswordCode = params.id;
    let passwordOne = null;
    let passwordTwo = null;
    return (
      <div className="initial">
        <div
          className="initial-card log-in"
          style={{
            justifyContent: 'flex-start',
          }}
        >
          <p
            style={{
              padding: '12px 22px',
              fontSize: 18,
            }}
          >
            Please enter a new password and then enter that same new password again.
          </p>
          <TextField
            floatingLabelText="Enter Password"
            id="enter-password-one"
            type="password"
            ref={() => {
            passwordOne = document.getElementById('enter-password-one');
          }}
          />
          <TextField
            floatingLabelText="Re-Enter Password"
            id="enter-password-two"
            type="password"
            ref={() => {
            passwordTwo = document.getElementById('enter-password-two');
          }}
          />
          <GreenRaisedButton
            label="Save"
            style={{
              marginTop: 22,
              width: 120,
            }}
            onTouchTap={async () => {
              const passOne = passwordOne.value;
              const passTwo = passwordTwo.value;
              if (!passOne || !passOne.trim()) {
                toastr.info('Please enter a valid password');
                return;
              }
              if (!passTwo || !passTwo.trim()) {
                toastr.info('Please re-enter a valid password');
                return;
              }
              if (passOne !== passTwo) {
                toastr.info('Passwords do not match, please enter them again');
                return;
              }
              try {
                const payload = await changePassword(
                  passOne,
                  forgotPasswordCode
                );
                if (!!payload.userNotFound) {
                  toastr.info('This link has been invalidated, please request a ' +
                   'password reset again');
                  return;
                }
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                toastr.success('Password correctly changed!');
                navigate('/login/')

              } catch (e) {
                console.error('[ERROR] changePassword', e);
                toastr.error('Something went wrong please try again');
              }
            }}
          />

        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
});
const dispatchToProps = (dispatch) => ({
  navigate: url => {
    dispatch(push(url));
  },
  endLoading: () => {
    dispatch(LoadingActions.endLoading());
  },
});
ForgotPassword = connect(
  stateToProps,
  dispatchToProps,
)(ForgotPassword);

export default ForgotPassword;