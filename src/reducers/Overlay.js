/**
 * @author Anthony Altieri on 9/26/16.
 */


const initialState = {
  showOverlay: false,
};

const Overlay = (state = initialState, action) => {
  switch (action.type) {
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

    default: {
      return state;
    }
  }
};

export default Overlay;
