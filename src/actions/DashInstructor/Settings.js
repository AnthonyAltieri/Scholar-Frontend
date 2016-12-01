/**
 * @author Anthony Altieri on 10/8/16.
 */

export const defaultSettingsRetrieved = (
  threshold,
  platformRestrictions,
  hasProfanityFilter,
  hasQuestionList,
  hasAlerts,
) => ({
  type: 'DEFAULT_SETTINGS_RETRIEVED',
  threshold,
  platformRestrictions,
  hasProfanityFilter,
  hasQuestionList,
  hasAlerts,
});

export const defaultSlideThreshold = (threshold) => ({
  type: 'DEFAULT_SLIDE_THRESHOLD',
  threshold,
});

export const defaultToggleAlert = () => ({
  type: 'DEFAULT_TOGGLE_ALERT',
});

export const defaultToggleAsk = () => ({
  type: 'DEFAULT_TOGGLE_ASK',
});

export const defaultToggleProfanityFilter = () => ({
  type: 'DEFAULT_TOGGLE_PROFANITY_FILTER',
});
