const initialState = {
  enteredQuestion: '',
  enteredAnswer: '',
  selectedOption: -1,
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

    case 'DASH_STUDENT_MODIFIED_ENTERED_ANSWER': {
      return {
        ...state,
        enteredAnswer: action.enteredAnswer,
      }
    }

    case 'DASH_STUDENT_CLEAR_ENTERED_ANSWER': {
      return {
        ...state,
        enteredAnswer: '',
      }
    }

    case 'DASH_STUDENT_SELECT_OPTION': {
      return {
        ...state,
        selectedOption: action.selectedOption,
      }
    }

    case 'ASSESS_DEACTIVATE_ASSESSMENT': {
      return {
        ...state,
        selectedOption: -1,
        enteredAnswer: '',
      }
    }

    default: {
      return state;
    }
  }
}

export default Student;
