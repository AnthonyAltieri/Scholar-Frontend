/**
 * @author Anthony Altieri on 9/26/16.
 */


const initialState = {
  isVisible: false,
};

const Overlay = (state = initialState, action) => {
  switch (action.type) {

    case 'LOG_OUT': {
      return initialState;
    }

    case 'PROMPT_END_SESSION':
    case 'SHOW_OVERLAY': {
      return {
        ...state,
        isVisible: true,
      }
    }

    case 'HIDE_OVERLAY': {
      return {
        ...state,
        isVisible: false,
      }
    }

    case 'SET_OVERLAY_TYPE': {
      return {
        ...state,
        type: action.overlayType,
      }
    }

    case 'CLEAR_OVERLAY_TYPE': {
      return {
        ...state,
        type: null,
      }
    }

    default: {
      return state;
    }
  }
};

export default Overlay;
