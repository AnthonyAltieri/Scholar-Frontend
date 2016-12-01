/**
 * @author Anthony Altieri on 10/9/16.
 */

const Instant = (state = {}, action) => {
  switch (action.type) {
    case 'START_INSTANT_ASSESSMENT': {
      return {
        id: action.id,
        prompt: action.prompt,
        options: action.options,
        responses: [],
        active: true,
      }
    }

    case 'END_INSTANT_ASSESSMENT': {
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

export default Instant;
