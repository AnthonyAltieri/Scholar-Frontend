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
import TextField from '../TextField';


const srcBack = require('../../img/App/back.svg');

const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const hasValidCredentials = (firstname, lastname, email, password, endLoading) => {
  if (!firstname || !firstname.trim()) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid first name.');
    return false;
  }
  if (!lastname || !lastname.trim()) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid last name.');
    return false;
  }
  if (!validEmail || !validEmail(email)) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid email.');
    return false;
  }
  if (!password || !password.trim()) {
    endLoading();
    toastr.error('Credential Error', 'Enter a valid password.');
    return false;
  }
  return true;
};

class Signup extends Component {
  componentDidMount() {
    const { endLoading } = this.props;
    endLoading();
  }

  render() {
    const { navigate, startLoading, endLoading,
      signUpSuccess, signUpFail } = this.props;
    let firstname;
    let lastname;
    let email;
    let password;
    let phone;
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
            <TextField
              floatingLabelText="School Email"
              type="email"
              onChange={(event) => {
                email = event.target.value;
              }}
            />
            <TextField
              floatingLabelText="Password"
              type="password"
              onChange={(event) => {
                password = event.target.value;
              }}
            />
            <TextField
              floatingLabelText="First Name"
              type="text"
              onChange={(event) => {
                firstname = event.target.value;
              }}
            />
            <TextField
              floatingLabelText="Last Name"
              type="text"
              onChange={(event) => {
                lastname = event.target.value;
              }}
            />
            <TextField
              floatingLabelText="Phone Number"
              type="text"
              onChange={(event) => {
                phone = event.target.value;
              }}
              style={{
                marginBottom: "12px",
              }}
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