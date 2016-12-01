/**
 * @author Anthony Altieri on 11/13/16.
 */

import Response from './Response';

const ResponseList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_Response': {
      return [
        ...state,
        Response(undefined, action),
      ];
    }

    case 'REMOVE_RESPONSE': {
      return state.filter((q) => q.id !== action.id);
    }

    case 'ADD_VOTE': {
      return [
        ...state.filter((q) => q.id !== action.id),
        Response(state.filter((q) => q.id === action.id)[0], action),
      ]
    }

    case 'REMOVE_VOTE': {
      return [
        ...state.filter((q) => q.id !== action.id),
        Response(state.filter((q) => q.id === action.id)[0] , action),
      ]
    }

    default: {
      return state;
    }
  }
};

export default ResponseList;
