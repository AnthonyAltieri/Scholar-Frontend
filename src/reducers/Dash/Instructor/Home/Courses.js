const initialState = {
  filter: 'ALL'
};

const Courses = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_CHANGE_COURSE_FILTER': {
      return {
        ...state,
        filter: action.filter,
      }
    }
    default: {
      return state;
    }
  }
}

export default Courses;
