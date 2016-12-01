/**
 * @author Anthony Altieri on 9/8/16.
 */


export const enterCourse = (courseId, courseSessionId) => ({
  type: 'ENTER_COURSE',
  courseSessionId,
  courseId,
});

export const retrievedQuestions = (questions) => ({
  type: 'RETRIEVED_QUESTIONS',
  questions,
});

export const setDashMode = (mode) => ({
  type: 'SET_DASH_MODE',
  mode,
});

export const showAlertOverlay = () => ({
  type: 'SHOW_ALERT_OVERLAY',
});

export const hideAlertOverlay = () => ({
  type: 'HIDE_ALERT_OVERLAY',
});
