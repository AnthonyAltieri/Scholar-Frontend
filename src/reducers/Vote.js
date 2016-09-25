/**
 * @author Anthony Altieri on 8/25/16.
 */

const Vote = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VOTE': {
      return {
        id: action.id,
        type: action.voteType,
        userId: action.userId,
        created: action.created,
      }
    }

    default: {
      return state;
    }
  }
};

export default Vote;