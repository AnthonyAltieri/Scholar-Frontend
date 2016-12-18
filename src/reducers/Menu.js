const initialState = {
  isOpen: false,
};

const Menu = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_OPEN': {
      return {
        ...state,
        isOpen: true,
      }
    }

    case 'MENU_CLOSE': {
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

export default Menu;
