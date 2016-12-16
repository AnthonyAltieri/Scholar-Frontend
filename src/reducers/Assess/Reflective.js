const Reflective = (state = {}, action) => {
  switch (action.type) {
    case 'ASSESS_ACTIVATE_ASSESSMENT': {
      return action.assessmentType === 'REFLECTIVE'
        ? {
          ...state,
          isActive: true,
          numberAnswers: 0,
          numberReviews: 0,
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

    case 'FOUND_ACTIVE_REFLECTIVE_ASSESSMENT': {
      return {
        ...state,
        numberAnswers: action.numberAnswers,
        numberReviews: action.numberReviews,
      }
    }


    default: {
      return state;
    }
  }
}


export default Reflective;
