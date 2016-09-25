/**
 * @author Anthony Altieri on 9/7/16.
 */

const Loading = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING': {
      return true;
    }

    case 'SIGN_UP_SUCCESS':
    case 'SIGN_UP_FAIL':
    case 'LOG_IN_SUCCESS':
    case 'LOG_IN_FAIL':
    case 'END_LOADING': {
      return false;
    }

    default: {
      return state;
    }
  }
};

export default Loading;
