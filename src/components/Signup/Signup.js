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
import AutoComplete from 'material-ui/AutoComplete';
import Colors from '../../util/Colors';
import { Schools, isValidSchool } from '../../Data/Schools';

const srcBack = require('../../img/App/back.svg');

const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validPhone = (phone) => {
  phone = phone.replace('-', '');
  phone = phone.replace(' ', '');
  phone = phone.replace('(', '');
  phone = phone.replace(')', '');
  const regEx = /\d{7}/;
  return regEx.test(phone);
};

const validSchool = (school) => {
  return true;
};

const hasValidCredentials = (
  firstName,
  lastName,
  email,
  password,
  phone,
  schoolId,
  school,
  endLoading,
) => {
  if (!firstName || !firstName.trim()) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid first name.'
    );
    return false;
  }
  if (!lastName || !lastName.trim()) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid last name.'
    );
    return false;
  }
  if (!validEmail || !validEmail(email)) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid email.'
    );
    return false;
  }
  if (!password || !password.trim()) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid password.'
    );
    return false;
  }
  if (!phone || !validPhone(phone)) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid phone number.'
    );
    return false;
  }
  if (!schoolId || !schoolId.trim()) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid School Id',
    )
  }
  if (!school || !validSchool(school)) {
    endLoading();
    toastr.error(
      'Credential Error',
      'Enter a valid school.'
    );
    return false;
  }
  return true;
};

async function handleSignUp(
  firstName,
  lastName,
  email,
  password,
  phone,
  institutionId,
  school,
  navigate,
  endLoading,
  signUpSuccess,
  signUpFail
) {

  try {

    const payload = await signUp(
      email,
      password,
      firstName,
      lastName,
      phone,
      institutionId,
      school
    );
    const {
      error,
      emailInUse,
      schoolNotFound,
      phoneInUse,
      user
    } = payload;
    if (!!error) {
      toastr.error('Something went wrong please try again.');
      endLoading();
      return;
    }
    if (!!emailInUse) {
      toastr.info('This email is in use, try another one.');
      endLoading();
      return;
    }
    if (!!schoolNotFound) {
      toastr.info('That is an invalid School Name.');
      endLoading();
      return;
    }
    if (!!phoneInUse) {
      toastr.info('That Phone Number is in use');
      endLoading();
      return;
    }
    signUpSuccess(
      user.email,
      user.id,
      `${user.firstName} ${user.lastName}`,
      user.type,
      user.phone,
      user.institutionId,
    );
    navigate('/dash/courses/active');
  } catch (e) {
    signUpFail();
  }
}

class Signup extends Component {
  componentDidMount() {
    const { endLoading } = this.props;
    endLoading();
  }

  render() {
    const {
      navigate,
      startLoading,
      endLoading,
      signUpSuccess,
      signUpFail,
    } = this.props;

    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let phone = '';
    return (
      <div className="sign-up fullscreen">
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
        <div
          className="c"
          style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            maxWidth: "500px",
            margin: "auto",
            backgroundColor: Colors.primary,
          }}
        >
          <TextField
            floatingLabelText="School Email"
            hintText="student@college.edu"
            id="email"
            type="email"
            ref={() => {
              const node = document.getElementById('email');
              if (!node) return;
              email = node;
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            fullWidth
          />
          <TextField
            floatingLabelText="Password"
            hintText="Minimum 6 Characters"
            id="password"
            type="password"
            ref={() => {
              const node = document.getElementById('password');
              if (!node) return;
              password = node;
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            fullWidth
          />
          <TextField
            floatingLabelText="First Name"
            type="text"
            id="firstName"
            ref={() => {
              const node = document.getElementById('firstName');
              if (!node) return;
              firstName = node;
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            fullWidth
          />
          <TextField
            floatingLabelText="Last Name"
            type="text"
            id="lastName"
            ref={() => {
              const node = document.getElementById('lastName');
              if (!node) return;
              lastName = node;
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            fullWidth
          />
          <TextField
            floatingLabelText="Student Id"
            type="text"
            id="institutionId"
            ref={() => {
              const node = document.getElementById('institutionId');
              if (!node) return;
              institutionId = node;
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            fullWidth
          />
          <TextField
            floatingLabelText="Phone Number"
            hintText="xxx-xxx-xxxx"
            type="text"
            id="phone"
            ref={() => {
              const node = document.getElementById('phone');
              if (!node) return;
              phone = node;
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            fullWidth
          />
          <AutoComplete
            floatingLabelText="School Name"
            type="text"
            floatingLabelFocusStyle={{
              color: Colors.bright,
            }}
            underlineFocusStyle={{
              borderColor: Colors.bright,
            }}
            underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
            style={{
              marginBottom: "12px",
            }}
            dataSource={Schools}
            ref={(n) => {
              school = n;
            }}
            filter={AutoComplete.caseInsensitiveFilter}
            fullWidth
          />
          <ButtonRound
            style={{
              marginBottom: "12px",
            }}
            onClick={() => {
              //startLoading();
              const validCredentials = hasValidCredentials(
                firstName.value,
                lastName.value,
                email.value,
                password.value,
                phone.value,
                institutionId.value,
                school.state.searchText,
                endLoading
              );
              if (validCredentials) {
                handleSignUp(
                  firstName.value,
                  lastName.value,
                  email.value,
                  password.value,
                  phone.value,
                  institutionId.value,
                  school.state.searchText,
                  navigate,
                  endLoading,
                  signUpSuccess,
                  signUpFail
                );
              }
            }}
          >
            SIGN UP
          </ButtonRound>
        </div>
      </div>
    )
    let institutionId = '';
    let school = '';
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
    signUpSuccess: (email, userId, userName, userType, phone, institutionId) => {
      dispatch(UserActions.logInSuccess(email, userId, userName, userType, phone, institutionId));
    },
    signUpFail: () => {
      dispatch(UserActions.logInFail());
    }
  }),
)(Signup);

export default Signup;
