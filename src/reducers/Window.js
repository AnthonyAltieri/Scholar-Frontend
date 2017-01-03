/**
 * @author Anthony Altieri on 1/3/17.
 */

const initialState = {
  width: -1,
  height: -1,
};

const Window = (state = initialState, action) => {
  switch (action.type) {

    case 'WINDOW_RESIZE': {
      return {
        ...state,
        width: action.width,
        height: action.height,
      }
    }

    default: {
      return state;
    }
  }
};

export default Window;
