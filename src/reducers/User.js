/**
 * @author Anthony Altieri on 9/4/16.
 */
import { DEMO_USERID } from '../util/demo'

const initial = {
  isLoggedIn: false,
};
const User = (state = initial, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
    case 'LOG_IN_SUCCESS': {
      let isDemo = false;
      if(action.id === DEMO_USERID) {
        isDemo = true
      }
      return {
        ...state,
        isLoggedIn: true,
        name: action.name,
        username: action.username,
        id: action.id,
        type: action.userType,
        schoolId: action.schoolId,
        phone: action.phone,
        institutionId: action.institutionId,
        isDemo: isDemo
      };
    }

    case 'RECEIVED_ACCOUNT_INFO': {
      return {
        ...state,
        name: `${action.firstName} ${action.lastName}`,
        username: action.username,
        phone: action.phone,
        institutionId: action.institutionId,
      }
    }


    case 'LOG_OUT': {
      return {
        isLoggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default User;
