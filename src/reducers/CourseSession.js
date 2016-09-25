/**
 * @author Anthony Altieri on 9/8/16.
 */

const CourseSession = (state = {}, action) => {
  switch (action.type) {
    case 'JOIN_COURSE': {
      return {
        id: action.id,
        code: action.code,
        mode: 'QUESTIONS',
      }
    }

    case 'SET_VIEW': {
      const view = action.view;
      if (view === 'DASH_COURSES') {
        return {}
      }
    }

    case 'SET_DASH_MODE': {
      return {
        ...state,
        mode: action.mode,
      }
    }

    case 'ACTIVATE_ALERT': {
      return {
        ...state,
        mode: 'ALERT',
      }
    }

    case 'QUESTION_SUBMIT_SUCCESS':
    case 'ACKNOWLEDGE_ALERT': {
      return {
        ...state,
        mode: 'QUESTIONS',
      }
    }

    case 'ASSESSMENT': {
      return {
        ...state,
        view: 'ASSESSMENT',
      }
    }

    default: {
      return state;
    }
  }
};

export default CourseSession;
