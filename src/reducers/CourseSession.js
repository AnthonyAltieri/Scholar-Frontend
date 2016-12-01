/**
 * @author Anthony Altieri on 9/8/16.
 */

const CourseSession = (state = {}, action) => {
  switch (action.type) {
    case 'JOIN_COURSESESSION': {
      return {
        ...state,
        id: action.id,
        code: action.code,
        mode: 'QUESTIONS',
      }
    }

    case 'TYPED_QUESTION': {
      return {
        ...state,
        enteredQuestion: action.enteredQuestion,
      }
    }

    case 'STARTED_COURSESESSION': {
      return {
        ...state,
        id: action.id,
        active: true,
      }
    }

    case 'ENDED_COURSESESSION': {
      return {
        ...state,
        active: false,
      }
    }

    case 'SET_ALERT_THRESHOLD': {
      return {
        ...state,
        threshold: action.threshold,
      }
    }

    case 'SET_ALERT_PERCENTAGE': {
      return {
        ...state,
        alertPercentage: action.alertPercentage,
      }
    }

    default: {
      return state;
    }
  }
};

export default CourseSession;
