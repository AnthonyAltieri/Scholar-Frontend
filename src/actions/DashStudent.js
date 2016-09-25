/**
 * @author Anthony Altieri on 9/8/16.
 */

export const setDashMode = (mode) => {
  return {
    type: 'SET_DASH_MODE',
    mode,
  }
};

export const questionSubmitSuccess = () => {
  return {
    type: 'QUESTION_SUBMIT_SUCCESS',
    mode: 'QUESTIONS'
  }
};

