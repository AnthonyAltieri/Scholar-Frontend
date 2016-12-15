/**
 * @author Anthony Altieri on 8/25/16.
 */

import Question from './Question';

const removeResponseById = (questions, id) => {
  let toExplore = [...questions];
  while (toExplore.length > 0) {
    const qOrR = toExplore[0];
    toExplore = toExplore.slice(1);
    const filtered = qOrR.responses.filter(r => r.id === id);
    if (filtered.length > 0) {
      qOrR.responses = qOrR.responses.filter(r => r.id !== id);
      return questions;
    }
    toExplore = [
      ...toExplore,
      ...qOrR.responses,
    ];
  }
  return questions;
};

const QuestionList = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVED_QUESTIONS': {
      return action.questions.map((q) => Question(q, action));
    }

    case 'ADD_QUESTION': {
      return [
        ...state,
        Question(undefined, action),
      ];
    }

    case 'QUESTION_REMOVE': {
      return state.filter((q) => q.id !== action.id);
    }

    case 'RESPONSE_REMOVE': {
      return removeResponseById(state, action.id);
    }

    case 'ADD_VOTE': 
    case 'REMOVE_VOTE': {
      return state.map(q => Question(q, action));
    }

    default: {
      return state;
    }
  }
};

export default QuestionList;
