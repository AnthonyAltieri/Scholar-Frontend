/**
 * @author Anthony Altieri on 1/16/17.
 */

const initialState = {};

const Account = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_ACCOUNT_INFO': {
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        institutionId: action.institutionId,
        username: action.username,
      }
    }

    case 'SET_ACCOUNT_FIRST_NAME': {
      return {
        ...state,
        firstName: action.firstName,
      }
    }

    case 'SET_ACCOUNT_LAST_NAME': {
      return {
        ...state,
        lastName: action.lastName,
      }
    }

    case 'SET_ACCOUNT_PHONE': {
      return {
        ...state,
        phone: action.phone,
      }
    }

    case 'SET_ACCOUNT_STUDENT_ID': {
      return {
        ...state,
        institutionId: action.institutionId,
      }
    }

    case 'LOG_OUT': {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default Account;