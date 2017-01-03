/**
 * @author Anthony Altieri on 1/2/17.
 */

const initialState = {
  filter: 'MOST_RECENT',
};

const Main = (state = initialState, action) => {
  switch (action.type) {

    case 'INSTRUCTOR_MAIN_SET_FILTER': {
      return {
        ...state,
        filter: action.filter,
      }
    }

    case 'LOG_OUT': {
      return initialState;
    }

    default: {
      return state;
    }
  };
};

export default Main;
