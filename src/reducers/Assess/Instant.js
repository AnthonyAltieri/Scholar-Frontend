const Instant = (state = {}, action) => {
  switch (action.type) {
    case 'ASSESS_ACTIVATE_ASSESSMENT': {
      return action.assessmentType === 'INSTANT'
        ? {
          ...state,
          isActive: true,
        }
        : state;
    }

    case 'ASSESS_DEACTIVATE_ASSESSMENT': {
      return {
        ...state,
        isActive: false,
      }
    }

    case 'ASSESS_INSTANT_ADD_OPTION': {
      const options = state.options || [];
      console.log('state',state);
      return {
        ...state,
        options: [
          ...options,
          action.option,
        ],
      }
    }

    case 'ASSESS_INSTANT_REMOVE_OPTION': {
      const options = state.options || [];
      return {
        ...state,
        options: [
          ...options.slice(0, action.index),
          ...options.slice(action.index + 1),
        ],
      }
    }

    default: {
      return state;
    }
  }
}

export default Instant;
