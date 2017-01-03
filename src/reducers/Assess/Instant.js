const initialState = {
  options: [],
  answers: [],
  correctOption: -1,
};

const Instant = (state = initialState, action) => {
  switch (action.type) {

    case 'LOG_OUT': {
      return initialState;
    }

    case 'RECEIVED_ACTIVE_ASSESSMENT': {
      return action.assessmentType === 'INSTANT'
        ? {
          ...state,
          isActive: true,
          options: action.options,
        }
        : state;
    }


    case 'FOUND_ACTIVE_INSTANT_ASSESSMENT': {
      return {
        ...state,
        options: action.options,
        answers: action.answers,
      }
    }

    case 'ASSESS_ACTIVATE_ASSESSMENT': {
      return action.assessmentType === 'INSTANT'
        ? {
          ...state,
          isActive: true,
          answers: [],
        }
        : state;
    }

    case 'ASSESS_DEACTIVATE_ASSESSMENT': {
      return {
        ...state,
        isActive: false,
        correctOption: -1,
        options: [],
      }
    }

    case 'ASSESS_INSTANT_ADD_OPTION': {
      const options = state.options || [];
      console.log('state',state);
      return {
        ...state,
        options: [
          ...options,
          action.option,
        ],
      }
    }

    case 'ASSESS_INSTANT_REMOVE_OPTION': {
      const options = state.options || [];
      return {
        ...state,
        options: [
          ...options.slice(0, action.index),
          ...options.slice(action.index + 1),
        ],
      }
    }

    case 'ASSESS_CHOOSE_CORRECT_OPTION': {
      return {
        ...state,
        correctOption: action.correctOption,
      }
    }

    case 'ASSESS_UNSELECT_CORRECT_OPTION': {
      return {
        ...state,
        correctOption: -1,
      }
    }

    case 'ASSESS_INSTANT_ANSWER_RECEIVED': {
      const answers = state.answers
        .filter(a => a.userId !== action.userId);
      return {
        ...state,
        answers: [
          ...answers,
          {
            userId: action.userId,
            optionIndex: action.optionIndex
          },
        ]
      }
    }

    default: {
      return state;
    }
  }
}

export default Instant;
