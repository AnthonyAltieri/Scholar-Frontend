const Reflective = (state = {}, action) => {
  switch (action.type) {
    case 'ASSESS_ACTIVATE_ASSESSMENT': {
      return action.assessmentType === 'REFLECTIVE'
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

    case 'RECEIVED_ACTIVE_ASSESSMENT': {
      return {
        ...state,
        isActive: true,
      }
    }


    default: {
      return state;
    }
  }
}


export default Reflective;
