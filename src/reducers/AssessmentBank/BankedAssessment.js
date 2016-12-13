
const BankedAssessment = (state = {}, action) => {
  switch (action.type) {

    case 'ASSESSMENT_BANK_ADD': {
      return {
        id: action.id,
        tags: action.tags,
        question: action.question,
        options: action.options,
        created: action.created,
        questionEdit: null,
        isOptionsVisible: false,
        optionsEdited: action.options.map(o => null),
        editQuestionMode: false,
        optionEditModes: action.options.map(o => false),
        addTagMode: false,
      }
    }

    case 'ASSESSMENT_BANK_RETRIEVED': {
      return {
        ...state,
        questionEdit: null,
        isOptionsVisible: false,
        optionsEdited: state.options.map(o => null),
        editQuestionMode: false,
        optionEditModes: state.options.map(o => false),
        addTagMode: false,
      }
    }

    case 'ASSESSMENT_BANK_SHOW_OPTIONS': {
      return state.id === action.id
        ? {
          ...state,
          isOptionsVisible: true,
        }
        : state;
    }

    case 'ASSESSMENT_BANK_HIDE_OPTIONS': {
      return state.id === action.id
        ? {
          ...state,
          isOptionsVisible: false,
        }
        : state;
    }

    case 'ASSESSMENT_BANK_ADD_OPTION': {
      if (state.id !== action.id) return state;
      return {
        ...state,
        options: [...state.options, action.option],
        optionsEditied: [...state.optionsEditied, false],
      }
    }

    case 'ASSESSMENT_BANK_REMOVE_OPTION': {
      if (state.id !== action.id) return state;
      const { options, optionsEditied }  = state;
      return {
        ...state,
        options: [
          ...options.slice(0, action.index),
          ...options.slice(action.index + 1),
        ],
        optionsEditied: [
          ...optionsEditied.slice(0, action.index),
          ...optionsEditied.slice(action.index + 1),
        ]
      }
    }

    case 'ASSESSMENT_BANK_QUESTION_EDITED': {
      return state.id === action.id
        ? ({
          ...state,
          questionEdit: action.question,
        })
        : state;
    }

    case 'ASSESSMENT_BANK_OPTION_EDITED': {
      return state.id === action.id
        ? ({
          ...state,
          optionsEdited: [
            ...state.optionsEdited.slice(0, action.index),
            action.value,
            ...state.optionsEdited.slice(action.index + 1),
          ],
        })
        : state;
    }

    case 'ASSESSMENT_BANK_CLEAR_EDITS': {
      return {
        ...state,
        questionEdit: null,
        optionsEdited: state.options.map(o => null),
        editQuestionMode: false,
        optionsEditModes: state.options.map(o => false),
      }
    }

    case 'ASSESSMENT_BANK_SAVE_EDIT': {
      return {
        ...state,
        question: action.question,
        options: action.options,
        questionEdit: null,
        optionsEdited: state.options.map(o => false),
        editQuestionMode: false,
        optionsEditModes: state.options.map(o => false),
      }
    }
    case 'ASSESSMENT_BANK_EDIT_QUESTION_MODE': {
      return state.id === action.id
        ? {
          ...state,
          editQuestionMode: true,
        }
        : state;
    }

    case 'ASSESSMENT_BANK_EDIT_QUESTION_CLEAR': {
      return state.id === action.id
        ? {
          ...state,
          questionEdit: null,
          editQuestionMode: false
        }
        : state;
    }
    case 'ASSESSMENT_BANK_EDIT_OPTION_MODE': {
      return state.id === action.id
        ? {
          ...state,
          optionEditModes: [
            ...state.optionEditModes.slice(0, action.index),
            true,
            ...state.optionEditModes.slice(action.index + 1),
          ],
          optionsEdited: [
            ...state.optionsEdited.slice(0, action.index),
            state.options[action.index],
            ...state.optionsEdited.slice(action.index + 1),
          ]
        }
        : state;
    }

    case 'ASSESSMENT_BANK_EDIT_OPTION_CLEAR': {
      return state.id === action.id
        ? {
          ...state,
          optionEditModes: state.options.map(o => false),
        }
        : state;
    }

    case 'ASSESSMENT_BANK_ENTER_ADD_TAG_MODE': {
      return state.id === action.id
        ? {
          ...state,
          addTagMode: true,
        }
        : state;
    }

    case 'ASSESSMENT_BANK_CANCEL_ADD_TAG_MODE': {
      return state.id === action.id
        ? {
          ...state,
          addTagMode: false,
        }
        : state;
    }

    case 'ASSESSMENT_BANK_ADD_TAG': {
      return state.id === action.id
        ? {
          ...state,
          tags: [
            ...state.tags,
            action.tag,
          ],
          addTagMode: false,
        }
        : state;
    }

    case 'ASSESSMENT_BANK_REMOVE_TAG': {
      return state.id === action.id
        ? {
          ...state,
          tags: [
            ...state.tags.slice(0, action.index),
            ...state.tags.slice(action.index + 1),
          ]
        }
        : state;
    }


    default: {
      return state;
    }
  }
};

export default BankedAssessment;
