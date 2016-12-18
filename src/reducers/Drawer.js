const Drawer = (state = {}, action) => {
  switch (action.type) {
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
