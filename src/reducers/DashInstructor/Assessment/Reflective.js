/**
 * @author Anthony Altieri on 10/9/16.
 */

const Reflective = (state = {}, action) => {
  switch (action.type) {
    case 'START_REFLECTIVE_ASSESSMENT': {
      return {
        id: action.id,
        prompt: action.prompt,
        numberResponses: 0,
        numberReviews: 0,
        active: true,
      }
    }

    case 'END_REFLECTIVE_ASSESSMENT': {
      return {
        ...state,
        active: false,
      }
    }

    default: {
      return state;
    }
  }
};

export default Reflective;
