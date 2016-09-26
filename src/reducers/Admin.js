/**
 * @author Anthony Altieri on 9/25/16.
 */

const initialState = {
  courses: [],
  users: [],
};

const Admin = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_COURSES': {
      return {
        ...state,
        courses: action.courses,
      }
    }

    case 'RECEIVED_USERS': {
      return {
        ...state,
        users: action.users,
      }
    }

    default: {
      return state;
    }
  }
};

export default Admin;
