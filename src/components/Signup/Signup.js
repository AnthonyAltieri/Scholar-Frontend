/**
 * @author Anthony Altieri on 9/5/16.
 */

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import * as UserActions from '../../actions/User';
import * as LoadingActions from '../../actions/Loading'
import { signUp } from '../../api/User';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import ButtonRound from '../buttons/ButtonRound';

const srcBack = require('../../img/App/back.svg');

const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const hasValidCredentials = (firstname, lastname, email, password, endLoading) => {
  if (!firstname.trim()) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid first name.');
    return false;
  }
  if (!lastname.trim()) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid last name.');
    return false;
  }
  if (!validEmail(email)) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid email.');
    return false;
  }
  if (!password.trim()) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid password.');
    return false;
  }
  return true;
};

class Signup extends Component {
  render() {
    const { navigate, startLoading, endLoading,
      signUpSuccess, signUpFail } = this.props;
    let firstname;
    let lastname;
    let email;
    let password;
    return (
      <div className="initial">
        <div className="initial-card sign-up">
          <div className="navigation">
            <img
              src={srcBack}
              className="back"
              onClick={() => {
                navigate('/login');
              }}
            />
            <h2
              className="text"
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In
            </h2>
          </div>
          <div className="container-input">
            <input
              type="email"
              ref={(n) => { email = n }}
              placeholder="Email"
            />
            <input
              type="text"
              ref={(n) => { firstname = n }}
              placeholder="First Name"
            />
            <input
              type="text"
              ref={(n) => { lastname = n }}
              placeholder="Last Name"
            />
            <input
              type="password"
              ref={(n) => { password = n }}
              placeholder="Password"
            />
          </div>
          <ButtonRound
            onClick={() => {
              startLoading();
              const firstVal = firstname.value;
              const lastVal = lastname.value;
              const emailVal = email.value ? email.value.toLocaleString() : '';
              const passwordVal = password.value;
              if (hasValidCredentials(firstVal, lastVal, emailVal,
                  passwordVal, endLoading)) {
                signUp(emailVal, passwordVal, firstVal, lastVal)
                  .then((user) => {
                    signUpSuccess(emailVal, user.uid, `${firstVal} ${lastVal}`, user.type);
                    navigate('/dash/courses/active');
                  })
                  .catch((error) => {
                    signUpFail();
                  })
              }
            }}
          >
            SIGN UP
          </ButtonRound>
        </div>
      </div>

    )
  }
}
Signup = connect(
  (state) => ({
  }),
  (dispatch) => ({
    navigate: (url) => {
      dispatch(push(url));
    },
    startLoading: () => {
      dispatch(LoadingActions.startLoading());
    },
    endLoading: () => {
      dispatch(LoadingActions.endLoading());
    },
    signUpSuccess: (email, userId, userName, userType) => {
      dispatch(UserActions.logInSuccess(email, userId, userName, userType));
    },
    signUpFail: () => {
      dispatch(UserActions.logInFail());
    }
  }),
)(Signup);

export default Signup;