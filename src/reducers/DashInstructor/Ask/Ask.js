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

    case 'RETRIEVED_MOST_VOTED': {
      return {
        ...state,
        mostVoted: action.mostVoted,
      }
    }

    case 'RETRIEVED_MOST_RECENT': {
      return {
        ...state,
        mostRecent: action.mostRecent,
      }
    }

    default: {
      return state;
    }
  }
};

export default Ask;
