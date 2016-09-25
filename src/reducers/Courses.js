/**
 * @author Anthony Altieri on 9/4/16.
 */

import Server from '../util/Server';

const Courses = (state = [], action) => {
  switch (action.type) {
    case 'GET_COURSES': {
      return;
    }

    case 'SET_COURSE_ACTIVE': {
      return;
    }

    case 'SET_COURSE_INACTIVE': {
      const course = state.filter(c => c.id === action.id)[0];
      if (!course) return;
      course.isActive = false;
      return state;
    }

    case 'RECEIVED_COURSES': {
      return action.courses;
    }

    default: {
      return state;
    }
  }
};

export default Courses;
