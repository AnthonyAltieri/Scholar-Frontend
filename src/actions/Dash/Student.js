export const modifiedEnteredQuestion = (enteredQuestion) => ({
  type: 'DASH_STUDENT_MODIFIED_ENTERED_QUESTION',
  enteredQuestion,
});

export const clearEnteredQuestion = () => ({
  type: 'DASH_STUDENT_CLEAR_ENTERED_QUESTION',
});
