const initialState = {
  isActive: false,
  hasAnswered: false,
  numberAnswers: 0,
  numberReviews: 0,
  hasStartedReview: false,
  toReview: [],
  answersWithReviews: [],
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
          hasAnswered: false,
          hasStartedReview: false,
          toReview: [],
          answersWithReviews: [],
        }
        : state;
    }

    case 'ASSESS_DEACTIVATE_ASSESSMENT': {
      return {
        ...state,
        isActive: false,
        hasStartedReview: false,
        hasAnswered: false,
        numberAnswers: 0,
        numberReviews: 0,
        toReview: [],
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

    case 'SUCCESSFULLY_SUBMITTED_REFLECTIVE_REVIEW': {
      return {
        ...state,
        toReview: [
          ...state.toReview.slice(0, action.reviewIndex),
          ...state.toReview.slice(action.reviewIndex + 1),
        ],
      }
    }

    case 'REFLECTIVE_ASSESSMENT_START_REVIEW': {
      return {
        ...state,
        hasStartedReview: true,
        toReview: action.toReview || [],
      }
    }

    case 'ASSESSMENT_REFLECTIVE_RECEIVED_ANSWERS_TO_REVIEW': {
      return {
        ...state,
        toReview: action.toReview,
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


    case 'ASSESSMENT_REFLECTIVE_RECEIVED_ANSWERS_WITH_REVIEWS': {
      return {
        ...state,
        answersWithReviews: action.answers,
      }
    }


    default: {
      return state;
    }
  }
}


export default Reflective;
