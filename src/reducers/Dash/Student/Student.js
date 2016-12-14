const initialState = {
  enteredQuestion: '',
};

const Student = (state = initialState, action) => {
  switch (action.type) {
    case 'DASH_STUDENT_MODIFIED_ENTERED_QUESTION': {
      return {
        ...state,
        enteredQuestion: action.enteredQuestion,
      }
    }

    case 'DASH_STUDENT_CLEAR_ENTERED_QUESTION': {
      return {
        ...state,
        enteredQuestion: '',
      }
    }

    default: {
      return state;
    }
  }
}

export default Student;
