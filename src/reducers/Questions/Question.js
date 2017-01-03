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

    case 'DISMISS_QUESTION': {
      return state.id === action.id
        ? {
          ...state,
          isDismissed: true,
        }
        : state;
    }


    case 'RECEIVED_QUESTIONS': {
      return {
        ...state,
        rank: state.votes.length,
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
        votes = Votes(votes, action);
        rank = votes.length;
      }
      return {
        ...state,
        votes,
        rank,
        responses: state.responses.map(r => Response(r, action))
      }
    }

    case 'ADD_ENDORSE':
    case 'REMOVE_ENDORSE': {
      return {
        ...state,
        isEndorsed: state.id === action.id
          ? action.type === 'ADD_ENDORSE'
          : state.isEndorsed
        ,
        responses: state.responses.map(r => Response(r, action)),
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
