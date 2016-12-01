/**
 * @author Anthony Altieri on 11/13/16.
 */


import Votes from './Votes';

let Response = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_Response': {
      return {
        id: action.id,
        content: action.content,
        userId: action.userId,
        created: action.created,
        rank: 0,
        votes: Votes(undefined, action),
        responses: [],
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

export default Response;
