/**
 * @author Anthony Altieri on 9/4/16.
 */

import CourseList from './CourseList';

const getVisibleCourses = (courses, filter) => {
  switch (filter) {
    case 'all': {
      return courses
    }

    case 'active': {
      return courses.filter(c => !!c.activeSessionId)
    }

    case 'inactive': {
      return courses.filter(c => !c.activeSessionId)
    }

    default: {
      throw new Error(`Invalid course filter: ${filter}`);
    }
  };
}

const initialState = {
  filter: 'active',
};

const Courses = (state = initialState, action) => {
  switch (action.type) {

    case 'RECEIVED_COURSES': {
      const courses = CourseList(state.courses, action);
      return {
        ...state,
        all: courses,
        visible: getVisibleCourses(courses, state.filter),
      }
    }

    case 'ACTIVATE_COURSE': {
      const courses = CourseList(state.id, action);
      return {
        ...state,
        all: courses,
        visible: getVisibleCourses(courses, state.filter),
      }
    }

    case 'DEACTIVATE_COURSE': {
      const courses = CourseList(state.id, action);
      return {
        ...state,
        all: courses,
        visible: getVisibleCourses(courses, state.filter),
      }
    }

    case 'ADD_COURSE': {
      const all = CourseList(state.all, action);
      return {
        ...state,
        all,
        visible: getVisibleCourses(all, state.filter),
      }
    }

    case 'SET_VISIBILITY_FILTER': {
      return {
        ...state,
        filter: action.filter,
        visible: getVisibleCourses(state.all, action.filter),
      }
    }

    default: {
      return state;
    }
  }
};

export default Courses;
