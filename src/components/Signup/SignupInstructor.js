/**
 * @author Anthony Altieri on 11/18/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LoadingActions from '../../actions/Loading';
import * as SignupInstructorActions from '../../actions/SignupInstructor';
import ReferralCodeScreen from './ReferralCodeScreen';
import InstructorCredentials from './InstructorCredentials';


class SignupInstructor extends Component {
  componentDidMount() {
    const { endLoading } = this.props;
    endLoading();

  }

  render() {
    const {
      referralCode,
      setReferralCode,
      clearReferralCode,
    } = this.props;

    // if (!referralCode) {
    if (false) {
      return (
        <ReferralCodeScreen
          setReferralCode={setReferralCode}
          handleBack={() => {
            clearReferralCode();
          }}
        />
      )
    }

    return (
      <InstructorCredentials />
    );
  }

}
const stateToProps = (state) => ({
  referralCode: state.SignupInstructor.referralCode
});

const dispatchToProps = (dispatch) => ({
  endLoading: () => {
    dispatch(LoadingActions.endLoading());
  },
  setReferralCode: (referralCode) => {
    dispatch(
      SignupInstructorActions.setReferralCode(referralCode)
    );
  },
  clearReferralCode: (referralCode) => {
    dispatch(
      SignupInstructorActions.clearReferralCode()
    )
  }

});

SignupInstructor = connect(
  stateToProps,
  dispatchToProps,
)(SignupInstructor);

export default SignupInstructor;
