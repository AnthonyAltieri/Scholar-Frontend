/**
 * @author Anthony Altieri on 9/5/16.
 */

import React, { Component } from 'react';
import * as LoadingActions from '../../actions/Loading';
import * as UserActions from '../../actions/User'
import * as OverlayActions from '../../actions/Overlay'
import * as UserApi from '../../api/User';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { logIn, isLoggedIn } from '../../api/User';
import ForgotPasswordDialog from './ForgotPasswordDialog';
import PickDemoAccountDialog from './PickDemoAccountDialog';
import InstructorPresentDialog from './InstructorPresentDialog';
import TextField from '../TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../../util/demo';

const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const hasValidCredentials = (email = '', password = '', endLoading) => {
  if (!email || !validEmail(email)) {
    toastr.error('Credential Error', 'Enter a valid email.');
    endLoading();
    return false;
  }

  if (!password || !password.trim()) {
    toastr.error('Credential Error', 'Enter a valid password.');
    endLoading();
    return false;
  }

  return true;
};

async function handleLogIn(
  email = '',
  password = '',
  logInSuccess,
  logInFail,
  endLoading,
  navigate,
) {
  try {
    const payload = await logIn(email, password);
    const { user, error, incorrectPassword } = payload;
    if (!!error) {
      console.log('error', e);
      toastr.error('Something went wrong, please try again.');
      endLoading();
      return;
    }
    if(!!incorrectPassword){
      toastr.info('Incorrect Password. Please try again');
      endLoading();
      return;
    }

    if (!user) {
      toastr.info('No account found associated with that email.');
      endLoading();
      return;
    }
    logInSuccess(
      user.email,
      user.id,
      `${user.firstName} ${user.lastName}`,
      user.type,
      user.phone,
      user.institutionId,
    );
    handleLoginSuccess(user.type, navigate);
  } catch (e) {
    console.log('error', e);
    toastr.error('Something went wrong, please try again.');
    logInFail();
  }
}

const handleLoginSuccess = (type, navigate) => {
  switch (type) {
    case 'ADMIN': {
      navigate('/dash/admin');
      return;
    }

    case 'INSTRUCTOR': {
      navigate('/dash/instructor/home');
      return;
    }

    case 'STUDENT': {
      navigate('/dash/courses/active');
      return;
    }

    default: {
      throw new Error(`Invalid user type: ${type}`);
    }
  }
};

class LogIn extends Component {
  componentDidMount() {
    this.props.logOut();
    this.props.endLoading();
    return;
    console.log('mount');
    console.log('isLoggedIn', this.props.isLoggedIn)
    if (!!this.props.isLoggedIn) {
      switch (this.props.userType) {
        case 'INSTRUCTOR':
        case 'STUDENT': {
          this.props.navigate('/dash/courses/active/');
          break;
        }

        case 'ADMIN': {
          this.props.navigate('/dash/admin/');
          break;
        }

        default: {
          throw new Error (`Invalid user type ${this.props.userType}`);
        }
      }
    }
    console.log('endLoading');
    this.props.endLoading();
  }

  render() {
    const {
      isOverlayVisible,
      navigate,
      showOverlay,
      startLoading,
      endLoading,
      logInSuccess,
      logInFail,
      hideOverlay,
      overlayType,
    } = this.props;

    let email;
    let password;

    return (
      <div
        className="initial"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            startLoading();
            const lowerEmail = email.value.toLowerCase();
            if (hasValidCredentials(lowerEmail, password.value, endLoading)) {
              handleLogIn(
                lowerEmail,
                password.value,
                logInSuccess,
                logInFail,
                endLoading,
                navigate
              );
            }
          }
        }}
      >
        <ForgotPasswordDialog
          isOpen={overlayType === 'FORGOT_PASSWORD' && isOverlayVisible}
          onCancelClick={() => {
            hideOverlay();
          }}
          onSendClick={async (email) => {
            try {
              const payload = await UserApi.requestForgotPassword(email)
              if (!!payload.error) {
                toastr.error('Something went wrong please try again');
                return;
              }
              if (!!payload.userNotFound) {
                toastr.info('No user found with that email');
                return;
              }
              toastr.success('Email send to ' + email + ', use that to ' +
               'reset your password');
              hideOverlay();
            } catch (e) {
              console.error('[Error] requestForgotPassword', e);
              toastr.error('Something went wrong please try again');
              return;
            }
          }}
        />
        <PickDemoAccountDialog
          isOpen={overlayType === 'PICK_DEMO_ACCOUNT_TYPE' && isOverlayVisible}
          onCancelClick={() => hideOverlay()}
          onStudentClick={() => {}}
          onInstructorClick={() => {}}
        />
        <InstructorPresentDialog
          isOpen={overlayType === 'INSTRUCTOR_PRESENT' && isOverlayVisible}
          onCancelClick={() => hideOverlay()}
          onRequestClick={() => {}}
        />
        <div className="initial-card log-in">
          <div className="top">
            <div className="brand">
              <img
                src={require('../../img/App/logo-dark.svg')}
                className="logo"
              />
              <h1 className="title">SCHOLAR</h1>
            </div>
            <div className="container-input">
              <TextField
                floatingLabelText="Email"
                type="email"
                id="email-input"
                ref={() => {
                  email = document.getElementById('email-input');
                }}
              />
              <TextField
                floatingLabelText="Password"
                type="password"
                id="password-input"
                ref={() => {
                  password = document.getElementById('password-input');
                }}
              />
              <RaisedButton
                label="Log in"
                secondary
                labelColor="#FFFFFF"
                className="login-button"
                style={{
                  width: 200,
                  marginBottom: 12,
                }}
                onTouchTap={() => {
                  startLoading();
                  if (hasValidCredentials(
                    email.value,
                    password.value,
                    endLoading
                  )) {
                    handleLogIn(
                      email.value.toLowerCase(),
                      password.value,
                      logInSuccess,
                      logInFail,
                      endLoading,
                      navigate
                    );
                  }
                }}
              />
              <RaisedButton
                label="forgot password"
                secondary
                labelColor="#FFFFFF"
                style={{
                  width: 200,
                  marginBottom: 12,
                }}
                onTouchTap={() => {
                  showOverlay('FORGOT_PASSWORD');
                }}
              />
              <RaisedButton
                label="Interactive Demo"
                secondary
                labelColor="#FFFFFF"
                style={{
                  width: 200,
                }}
                onTouchTap={() => {
                  {//TODO: Enable this later for a fuller demo
                    /*showOverlay('PICK_DEMO_ACCOUNT_TYPE');*/}
                   startLoading();
                  handleLogIn(
                   DEMO_EMAIL.toLowerCase(),
                    DEMO_PASSWORD,
                    logInSuccess,
                    logInFail,
                    endLoading,
                    navigate
                  );

                }}
              />
            </div>
          </div>
          <FlatButton
            label="Sign Up"
            onTouchTap={() => {
              navigate('/signup')
            }}
            style={{
              marginBottom: 4,
            }}
            labelStyle={{
              fontSize: 16,
            }}
          />
        </div>
      </div>
    )
  }
};
LogIn = connect(
  (state) => ({
    isOverlayVisible: state.Overlay.isVisible,
    overlayType: state.Overlay.type,
    isLoggedIn: state.User.isLoggedIn,
    userType: state.User.type,
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
    logInSuccess: (email, id, name, type, phone, institutionId) => {
      dispatch(UserActions.logInSuccess(
        email,
        id,
        name,
        type,
        phone,
        institutionId
      ))
    },
    logInFail: () => {
      dispatch(UserActions.logInFail());
    },
    showOverlay: (type) => {
      dispatch(OverlayActions.showOverlay());
      dispatch(OverlayActions.setOverlayType(type))
    },
    logOut: () => {
	console.log("in logOut");
      dispatch(UserActions.logOut());
    },
    hideOverlay: () => {
      dispatch(OverlayActions.hideOverlay());
      dispatch(OverlayActions.clearOverlayType());
    },
    dispatch,
  })
)(LogIn);


export default LogIn;
