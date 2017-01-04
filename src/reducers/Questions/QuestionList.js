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

const initialState = [];

const QuestionList = (state = initialState, action) => {
  switch (action.type) {



    case 'ENDED_COURSESESSION':
    case 'LOG_OUT': {
      return initialState;
    }

    case 'RECEIVED_QUESTIONS': {
      return action.questions.map((q) => Question(q, action));
    }

    case 'ADD_QUESTION': {
      const questions = state.filter(q => q.id !== action.id);
      return [
        ...questions,
        Question(undefined, action),
      ];
    }


    case 'DISMISS_QUESTION': {
      return state.map(q => Question(q, action));
    }

    case 'RESPONSE_REMOVE': {
      return removeResponseById(state, action.id);
    }

    case 'ADD_ENDORSE':
    case 'REMOVE_ENDORSE':
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
