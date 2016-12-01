/**
 * @author Anthony Altieri on 10/10/16.
 */

const Ask = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVED_QUESTIONS': {
      return {
        ...state,
        questions: action.questions,
      }
    }

    case 'CLEAR_QUESTIONS': {
      return {
        ...state,
        questions: null,
      }
    }

    default: {
      return state;
    }
  }
};

export default Ask;
