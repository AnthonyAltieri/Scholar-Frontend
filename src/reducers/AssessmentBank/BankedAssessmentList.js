import BankedAssessment from './BankedAssessment';

const BankedAssessmentList = (state = [], action) => {
  switch (action.type) {
    case 'ASSESSMENT_BANK_ADD': {
      return [
        ...state,
        BankedAssessment(undefined, action),
      ]
    }

    case 'ASSESSMENT_BANK_REMOVE': {
      return state.filter(ba => ba.id !== action.id);
    }

    case 'ASSESSMENT_BANK_RETRIEVED': {
      return action.bank.map(ba => BankedAssessment(ba, action))
    }

    case 'ASSESSMENT_BANK_FILTER_BY_TAG': {
      return state.map(ba => filterByTag(ba, action.tag))
    }

    case 'ASSESSMENT_BANK_REMOVE_TAG':
    case 'ASSESSMENT_BANK_ADD_TAG':
    case 'ASSESSMENT_BANK_SAVE_EDIT':
    case 'ASSESSMENT_BANK_ENTER_ADD_TAG_MODE':
    case 'ASSESSMENT_BANK_CANCEL_ADD_TAG_MODE':
    case 'ASSESSMENT_BANK_SHOW_OPTIONS':
    case 'ASSESSMENT_BANK_HIDE_OPTIONS':
    case 'ASSESSMENT_BANK_EDIT_OPTION_MODE':
    case 'ASSESSMENT_BANK_EDIT_OPTION_CLEAR':
    case 'ASSESSMENT_BANK_EDIT_QUESTION_MODE':
    case 'ASSESSMENT_BANK_EDIT_QUESTION_CLEAR':
    case 'ASSESSMENT_BANK_QUESTION_EDITED':
    case 'ASSESSMENT_BANK_OPTION_EDITED':
    case 'ASSESSMENT_BANK_CLEAR_EDITS':
    case 'ASSESSMENT_BANK_ADD_OPTION':
    case 'ASSESSMENT_BANK_REMOVE_OPTION': {
      return state.map(ba => BankedAssessment(ba, action));
    }

    default: {
      return state;
    }
  }
};

export default BankedAssessmentList;
