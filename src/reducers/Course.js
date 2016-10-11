/**
 * @author Anthony Altieri on 10/9/16.
 */

const Course = (state = {}, action) => {
  switch (action.type) {
    case 'JOIN_COURSE': {
      return {
        id: action.id,
        code: action.code,
        title: action.title,
      }
    }

    default: {
      return state;
    }
  }
};

export default Course;
