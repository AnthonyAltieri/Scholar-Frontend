/**
 * @author Anthony Altieri on 10/9/16.
 */

const validateCourse = (course) => {
  if (!course.id) {
    throw new Error('Course does not have id');
  }
  if (!course.abbreviation) {
    throw new Error('Course does not have abbreviation');
  }
  if (!course.timeStart) {
    throw new Error('Course does not have timeStart');
  }
  if (!course.timeEnd) {
    throw new Error('Course does not have an timeEnd');
  }
  if (!course.instructorName) {
    throw new Error('Course does not have an instructorName');
  }
};

const Course = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVED_COURSES': {
      try {
        validateCourse(state);
        return state;
      } catch (e) {
        // TODO: fix the dirty fix, consider making another
        // reducer for the top level Course information
        return state;
        throw new Error(e);
      }
    }

    case 'ACTIVATE_COURSE': {
      if (state.id !== action.id) return state;
      return {
        ...state,
        activeCourseSessionId: action.courseSessionId,
      }
    }

    case 'DEACTIVATE_COURSE': {
      if (state.id !== action.id) return state;
      return {
        ...state,
        activeCourseSessionId: null,
      }
    }

    case 'JOIN_COURSE': {
      return {
        id: action.id,
        abbreviation: action.abbreviation,
        activeCourseSessionId: action.activeCourseSessionId,
        timeStart: action.timeStart,
        timeEnd: action.timeEnd,
      }
    }

    case 'CLEAR_COURSE': {
      return {}
    }

    default: {
      return state;
    }
  }
};

export default Course;
