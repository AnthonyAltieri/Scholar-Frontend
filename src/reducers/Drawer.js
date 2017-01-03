const initialState = {};

const Drawer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_OUT': {
      return initialState;
    }

    case 'DRAWER_OPEN': {
      return {
        ...state,
        isOpen: true,
      }
    }
    case 'DRAWER_CLOSE': {
      return {
        ...state,
        isOpen: false,
      }
    }
    default: {
      return state;
    }
  }
}

export default Drawer;
