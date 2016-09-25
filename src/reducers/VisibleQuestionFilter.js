const VisibleQuestionFilter = (state = 'MOST_RECENT', action) => {
  switch (action.type) {
    case 'SET_QUESTION_VISIBILITY_FILTER': {
      return action.filter;
    }

    default: {
      return state;
    }
  }
};

export default VisibleQuestionFilter;
