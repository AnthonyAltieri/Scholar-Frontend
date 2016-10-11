/**
 * @author Anthony Altieri on 10/10/16.
 */

const Ask = (state = {}, action) => {
  switch (action.type) {
    case 'RETRIEVED_QUESTIONS': {
      return {
        questions: action.questions,
      }
    }

    default: {
      return state;
    }
  }
};

export default Ask;
