export const modifiedEnteredQuestion = (enteredQuestion) => ({
  type: 'DASH_STUDENT_MODIFIED_ENTERED_QUESTION',
  enteredQuestion,
});

export const clearEnteredQuestion = () => ({
  type: 'DASH_STUDENT_CLEAR_ENTERED_QUESTION',
});

export const modifiedEnteredAnswer = (enteredAnswer) => ({
  type: 'DASH_STUDENT_MODIFIED_ENTERED_ANSWER',
  enteredAnswer,
});

export const clearEnteredAnswer = () => ({
  type: 'DASH_STUDENT_CLEAR_ENTERED_ANSWER',
});

export const selectOption = (selectedOption) => ({
  type: 'DASH_STUDENT_SELECT_OPTION',
  selectedOption,
})

export const assessmentEnd = () => ({
  type: 'DASH_STUDENT_ASSESSMENT_END',
});
