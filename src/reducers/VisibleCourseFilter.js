/**
 * @author Anthony Altieri on 9/7/16.
 */

const VisibleCourseFilter = (state = 'inactive', action) => {
  switch (action.type) {
    case 'SET_COURSE_VISIBILITY_FILTER': {
      return action.filter;
    }

    default: {
      return state;
    }
  }
};

export default VisibleCourseFilter;
