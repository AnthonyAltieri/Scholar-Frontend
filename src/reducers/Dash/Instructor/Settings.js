/**
 * @author Anthony Altieri on 11/19/16.
 */

const Settings = (state = {}, action) => {
  switch (action.type) {
    case 'DEFAULT_SETTINGS_RETRIEVED': {
      return {
        ...state,
        threshold: action.threshold,
        platformRestrictions: action.platformRestrictions,
        hasProfanityFilter: action.hasProfanityFilter,
        hasQuestionList: action.hasQuestionList,
        hasAlerts: action.hasAlerts,
      }
    }

    case 'DEFAULT_SLIDE_THRESHOLD': {
      return {
        ...state,
        threshold: action.threshold,
      }
    }

    case 'DEFAULT_TOGGLE_ALERT': {
      return {
        ...state,
        enableAlert: !state.enableAlert,
      }
    }

    case 'DEFAULT_TOGGLE_ASK': {
      return {
        ...state,
        enableAsk: !state.enableAsk,
      }
    }

    case 'DEFAULT_TOGGLE_PROFANITY_FILTER': {
      return {
        ...state,
        hasProfanityFilter: !state.hasProfanityFilter,
      }
    }

    default: {
      return state;
    }
  }
};

export default Settings;
