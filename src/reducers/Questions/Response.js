/**
 * @author Anthony Altieri on 11/27/16.
 */

const Response = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVED_QUESTIONS': {
      return {
        ...state,
        responses: state.responses.reduce((acc, cur, i) => (
          acc = [...acc, Response(cur, action)]
        ), []),
      }

    }

    case 'ADD_VOTE':
    case 'REMOVE_VOTE': {
      let votes = state.votes;
      let rank = state.rank;
      if (action.id === state.id) {
        votes = Votes(undefined, action);
        rank = votes.length;
      }
      return {
        ...state,
        votes,
        rank,
        responses: state.responses.map(r => Response(r, action))
      }
    }

    default: {
      return state;
    }
  }
};

export default Response;
