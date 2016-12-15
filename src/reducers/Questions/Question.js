/**
 * @author Anthony Altieri on 8/25/16.
 */

import Votes from './Votes';
import Response from './Response';


let Question = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QUESTION': {
      return {
        id: action.id,
        content: action.content,
        userId: action.userId,
        created: action.created,
        rank: 0,
        votes: Votes(undefined, action),
        flag: false,
        responses: [],
      }
    }


    case 'RECEIVED_QUESTIONS': {
      return {
        ...state,
        responses: state.responses.map(r => Response(r, action)),
      };

      return action.questions.reduce((acc, cur, i) => {
        action.question = cur;
        return acc = [...acc, Question(undefined, action)]
      }, []);
    }

    case 'REMOVE_VOTE':
    case 'ADD_VOTE': {
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

    case 'ADD_FLAG': {
      return {
        ...state,
        flag: true,
      }
    }

    case 'REMOVE_FLAG': {
      return {
        ...state,
        flag: false,
      }
    }

    default: {
      return state;
    }
  }
};

export default Question;
