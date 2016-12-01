/**
 * @author Anthony Altieri on 11/18/16.
 */

const SignupInstructor = (state = {}, action) => {
  switch (action.type) {
    case 'SET_REFERRAL_CODE': {
      return {
        ...state,
        referralCode: action.referralCode,
      }
    }

    case 'CLEAR_REFERRAL_CODE': {
      return {
        ...state,
        referralCode: null,
      }
    }

    default: {
      return state
    }
  }
};

export default SignupInstructor;