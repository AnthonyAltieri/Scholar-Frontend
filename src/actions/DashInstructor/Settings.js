/**
 * @author Anthony Altieri on 10/8/16.
 */

export const slideThreshold = (threshold) => ({
  type: 'SLIDE_THRESHOLD',
  threshold,
});

export const toggleAlert = (enableAlert) => ({
  type: 'TOGGLE_ALERT',
  enableAlert,
});

export const toggleAsk = (enableAsk) => ({
  type: 'TOGGLE_ASK',
  enableAsk,
});

export const toggleProfanityFilter = (hasProfanityFilter) => ({
  type: 'TOGGLE_PROFANITY_FILTER',
  hasProfanityFilter,
});
