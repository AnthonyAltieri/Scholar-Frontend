const initialState = {
  isActive: false,
  hasAnswered: false,
  numberAnswers: 0,
  numberReviews: 0,
}

const Reflective = (state = initialState, action) => {
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
        hasAnswered: false,
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

    case 'SUCCESSFULLY_SUBMITTED_REFLECTIVE_ANSWER': {
      return {
        ...state,
        hasAnswered: true,
      }
    }

    case 'REFLECTIVE_ASSESSMENT_REVIEWED': {
      return {
        ...state,
        numberReviews: (state.numberReviews + 1),
      }
    }

    case 'REFLECTIVE_ASSESSMENT_ANSWERED': {
      return {
        ...state,
        numberAnswers: (state.numberAnswers + 1),
      }
    }


    default: {
      return state;
    }
  }
}


export default Reflective;
