/**
 * @author Anthony Altieri on 11/27/16.
 */

const Response = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVED_QUESTIONS': {
      return {
        ...state,
        responses: state.responses.reduce((acc, cur, i) => (
          acc = [...acc, Response(cur, action)]
        ), []),
      }

    }

    default: {
      return state;
    }
  }
};

export default Response;
