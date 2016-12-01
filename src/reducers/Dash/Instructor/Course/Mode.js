/**
 * @author Anthony Altieri on 11/26/16.
 * @return {string}
 */

const Mode = (state = 'MAIN', action ) => {
  switch (action.type) {
    case 'SET_MODE': {
      return action.mode;
    }

    case 'CLEAR_MODE': {
      return 'MAIN';
    }

    default: {
      return state;
    }
  }
};

export default Mode;
