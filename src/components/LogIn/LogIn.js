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
import { logIn, isLoggedIn, setUserStatusListener } from '../../api/User';
import ButtonClear from '../buttons/ButtonClear.jsx';
import ButtonRound from '../buttons/ButtonRound';
import Overlay from './Overlay';

const validEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const hasValidCredentials = (email = '', password = '', endLoading) => {
  if (!validEmail(email)) {
    toastr.error('Credential Error', 'Enter a valid email.');
    return false;
  }

  if (!password.trim()) {
    toastr.error('Credential Error', 'Enter a valid password.');
    return false;
  }

  return true;
};

const handleLoginSuccess = (type, navigate) => {
  if (type === 'ADMIN') {
    navigate('/dash/admin');
    return;
  }
  navigate('/dash/courses/active');
};

class LogIn extends Component {
  componentDidMount() {
    console.log('mount');
    console.log('isLoggedIn', this.props.isLoggedIn)
    if (this.props.isLoggedIn) {
      switch (this.props.userType) {
        case 'INSTRUCTOR':
        case 'STUDENT': {
          this.props.navigate('/dash/courses/active');
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
      isOverlayVisible, navigate, showOverlay,
      startLoading, endLoading, logInSuccess, logInFail,
      dispatch,
    } = this.props;

    let email;
    let password;

    return (
      <div
        className="initial"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            startLoading();
            if (hasValidCredentials(email.value.toLowerCase(), password.value, endLoading)) {
              logIn(email.value.toLowerCase(), password.value)
                .then((user) => {
                  logInSuccess(user.email, user.id, `${user.firstname} ${user.lastname}`,
                    user.type);
                  handleLoginSuccess(user.type, navigate);
                  setUserStatusListener(() => {}, () => {
                    this.props.dispatch(UserActions.logOut());
                  });
                })
                .catch((error) => {
                  console.log('error: ', error);
                  logInFail();
                })
            }
          }
        }}
      >
        {isOverlayVisible ? <Overlay dispatch={dispatch}/> : null }
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
              <input
                ref={(n) => {
                  email = n
                }}
                type="email"
                placeholder="Email"
              />
              <input
                ref={(n) => {
                  password = n
                }}
                type="password"
                placeholder="Password"
              />

              <ButtonRound
                onClick={() => {
                  startLoading();
                  if (hasValidCredentials(email.value.toLowerCase(), password.value)) {
                    logIn(email.value.toLowerCase(), password.value)
                      .then((user) => {
                        logInSuccess(user.email, user.id, `${user.firstname} ${user.lastname}`,
                          user.type);
                        handleLoginSuccess(user.type, navigate);
                        setUserStatusListener(() => {}, () => {
                          this.props.dispatch(UserActions.logOut());
                        });
                      })
                      .catch((error) => {
                        console.log('error: ', error);
                        logInFail();
                      })
                  } else {
                    endLoading();
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
    dispatch,
  })
)(LogIn);


export default LogIn;
