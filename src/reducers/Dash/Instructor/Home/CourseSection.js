/**
 * @author Anthony Altieri on 12/28/16.
 */

import Course from '../../../Course';

const initialState = {
  selectedCourse: Course(undefined, {}),
  filter: 'ALL',
  loading: false,
  lastCourseSessionError: false,
  lastCourseSession: null,
};

const CourseSection = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_COURSE_SECTION_ERROR': {
      return {
        ...state,
        lastCourseSessionError: true,
      }
    }

    case 'CLEAR_COURSE_SECTION_ERROR': {
      return {
        ...state,
        lastCourseSessionError: false,
      }
    }

    case 'SET_COURSE_SECTION_LAST_COURSE_SESSION': {
      return {
        ...state,
        lastCourseSession: action.courseSession,
      }
    }

    case 'CLEAR_COURSE_SECTION_LAST_COURSE_SESSION': {
      return {
        ...state,
        lastCourseSession: null,
      }
    }

    case 'SET_SELECTED_COURSE': {
      return {
        ...state,
        selectedCourse: Course(action.course, action),
      }
    }

    case 'CLEAR_SELECTED_COURSE': {
      return {
        ...state,
        selectedCourse: Course(undefined, {}),
      };
    }

    case 'SET_COURSE_SECTION_FILTER': {
      return {
        ...state,
        filter: action.filter,
      }
    }

    case 'SET_COURSE_SECTION_LOADING_ON': {
      return {
        ...state,
        isLoading: true,
      }
    }

    case 'SET_COURSE_SECTION_LOADING_OFF': {
      return {
        ...state,
        isLoading: false,
      }
    }

    default: {
      return state;
    }
  }
};

export default CourseSection;
