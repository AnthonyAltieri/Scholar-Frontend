/**
 * @author Anthony Altieri on 10/9/16.
 */

export const startedCourseSession = (id) => ({
  type: 'STARTED_COURSESESSION',
  id,
});

export const endedCourseSession = () => ({
  type: 'ENDED_COURSESESSION',
});

export const typedQuestion = (enteredQuestion) => ({
  type: 'TYPED_QUESTION',
  enteredQuestion,
});

export const setAlertThreshold = (threshold) => ({
  type: 'SET_ALERT_THRESHOLD',
  threshold,
});

export const setAlertPercentage = (alertPercentage) => ({
  type: 'SET_ALERT_PERCENTAGE',
  alertPercentage,
});