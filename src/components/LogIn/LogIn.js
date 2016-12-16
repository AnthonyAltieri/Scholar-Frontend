/**
 * @author Anthony Altieri on 9/5/16.
 */

import React, { Component } from 'react';
import * as LoadingActions from '../../actions/Loading';
import * as UserActions from '../../actions/User'
import * as OverlayActions from '../../actions/Overlay'
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { logIn, isLoggedIn } from '../../api/User';
import ButtonClear from '../buttons/ButtonClear';
import ButtonRound from '../buttons/ButtonRound';
import ForgotPasswordDialog from './ForgotPasswordDialog';
import TextField from '../TextField';

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
  email,
  password,
  logInSuccess,
  logInFail,
  endLoading,
  navigate,
) {
  try {
    const payload = await logIn(email, password);
    const { user, error } = payload;
    if (!!error) {
      console.log('error', e);
      toastr.error('Something went wrong, please try again.');
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
      user.type
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
    } = this.props;

    let email;
    let password;

    return (
      <div
        className="initial"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            startLoading();
            const lowerEmail = email.toLowerCase();
            if (hasValidCredentials(email.toLowerCase(), password, endLoading)) {
              handleLogIn(
                email.toLowerCase(),
                password,
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
          isOpen={isOverlayVisible}
          onCancelClick={() => {
            hideOverlay();
          }}
          onSendClick={() => {
            // TODO: add forgot password functionality
            hideOverlay();
          }}
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
              <br />
              <ButtonRound
                onClick={() => {
                  startLoading();
                  if (hasValidCredentials(email, password, endLoading)) {
                    handleLogIn(
                      email.toLowerCase(),
                      password,
                      logInSuccess,
                      logInFail,
                      endLoading,
                      navigate
                    );
                  }
                }}
              >
                LOG IN
              </ButtonRound>
              <ButtonRound
                className="background-bright"
                onClick={() => {
                  showOverlay();
                }}
              >
                FORGOT PASSWORD
              </ButtonRound>
            </div>
          </div>
          <ButtonClear
            onClick={() => {
              navigate('/signup')
            }}
          >
            SIGN UP
          </ButtonClear>
        </div>
      </div>
    )
  }
};
LogIn = connect(
  (state) => ({
    isOverlayVisible: state.Overlay.isVisible,
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
    logInSuccess: (email, id, name, type) => {
      dispatch(UserActions.logInSuccess(email, id, name, type))
    },
    logInFail: () => {
      dispatch(UserActions.logInFail());
    },
    showOverlay: () => {
      dispatch(OverlayActions.showOverlay());
    },
    hideOverlay: () => {
      dispatch(OverlayActions.hideOverlay())
    },
    dispatch,
  })
)(LogIn);


export default LogIn;
