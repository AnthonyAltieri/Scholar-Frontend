/**
 * @author Anthony Altieri on 8/25/16.
 */

import Vote from './Vote';

const Votes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE': {
      return [
        ...state,
        Vote(undefined, action),
      ]
    }

    case 'REMOVE_VOTE': {
      return state.filter((v) => v.userId !== action.userId);
    }

    default: {
      return state;
    }
  }
};

export default Votes;
