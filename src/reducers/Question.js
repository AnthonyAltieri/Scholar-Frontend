/**
 * @author Anthony Altieri on 8/25/16.
 */

import Votes from './Votes';

let Question = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QUESTION': {
      return {
        id: action.id,
        text: action.text,
        userId: action.userId,
        created: action.created,
        rank: 0,
        votes: Votes(undefined, action),
      }
    }

    case 'ADD_VOTE': {
      const votes = Votes(undefined, action);
      const rank = votes.length;
      return {
        ...state,
        votes,
        rank,
      }
    }

    case 'REMOVE_VOTE': {
      const votes = Votes(state.votes, action);
      const rank = votes.length;
      return {
        ...state,
        votes,
        rank,
      }
    }

    default: {
      return state;
    }
  }
};

export default Question;
