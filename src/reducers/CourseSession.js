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

    default: {
      return state;
    }
  }
};

export default CourseSession;
