/**
 * @author Anthony Altieri on 9/6/16.
 */

import Course from '../Course';

const setCourseActivation = (state, action) => {
  const idxOfCourse = state.indexOf(c => c.id === action.id);
  if (idxOfCourse === -1) return state;
  return [
    state.slice(0, idxOfCourse),
    Course(state[idxOfCourse], action),
    state.slice(idxOfCourse + 1)
  ]
};

const CourseList = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVED_COURSES': {
      return [
        ...state,
        ...action.courses.map(c => Course(c, action))
      ]
    }

    case 'ACTIVATE_COURSE': {
      return setCourseActivation(state, action);
    }

    case 'DEACTIVATE_COURSE': {
      return setCourseActivation(state, action);
    }

    case 'ADD_COURSE': {
      return [...state, Course(action.course, action)];
    }

    default: {
      return state;
    }
  }
};

export default CourseList;
