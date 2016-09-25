/**
 * @author Anthony Altieri on 9/4/16.
 */

const initial = {
  isLoggedIn: false,
};
const User = (state = initial, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
    case 'LOG_IN_SUCCESS': {
      return {
        isLoggedIn: true,
        name: action.name,
        username: action.username,
        id: action.id,
        type: action.userType,
      }
    }

    case 'LOG_OUT': {
      return {
        isLoggedIn: false,
      }
    }

    default: {
      return state;
    }
  }
};

export default User;
