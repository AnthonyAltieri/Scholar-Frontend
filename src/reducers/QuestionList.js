/**
 * @author Anthony Altieri on 8/25/16.
 */

import Question from './Question';

const QuestionList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION': {
      return [
        ...state,
        Question(undefined, action),
      ];
    }

    case 'REMOVE_QUESTION': {
      return state.filter((q) => q.id !== action.id);
    }

    case 'ADD_VOTE': {
      return [
        ...state.filter((q) => q.id !== action.id),
        Question(state.filter((q) => q.id === action.id)[0], action),
      ]
    }

    case 'REMOVE_VOTE': {
      return [
        ...state.filter((q) => q.id !== action.id),
        Question(state.filter((q) => q.id === action.id)[0] , action),
      ]
    }

    default: {
      return state;
    }
  }
};

export default QuestionList;
