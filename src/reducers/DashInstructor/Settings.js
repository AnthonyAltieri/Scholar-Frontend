/**
 * @author Anthony Altieri on 10/8/16.
 */


const Settings = (state = {}, action) => {
  switch (action.type) {
    case 'RETRIEVED_SETTINGS': {
      return {
        ...state,
        threshold: action.threshold,
        platformRestrictions: action.platformRestrictions,
        hasProfanityFilter: action.hasProfanityFilter,
        hasQuestionList: action.hasQuestionList,
        hasAlerts: action.hasAlerts,
      }
    }

    case 'SLIDE_THRESHOLD': {
      return {
        ...state,
        threshold: action.threshold,
      }
    }

    case 'TOGGLE_ALERT': {
      return {
        ...state,
        enableAlert: action.enableAlert,
      }
    }

    case 'TOGGLE_ASK': {
      return {
        ...state,
        enableAsk: action.enableAsk,
      }
    }

    case 'TOGGLE_PROFANITY_FILTER': {
      return {
        ...state,
        hasProfanityFilter: action.hasProfanityFilter,
      }
    }

    default: {
      return state;
    }
  }
};

export default Settings;
