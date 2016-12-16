export const addOption = (option) => ({
  type: 'ASSESS_INSTANT_ADD_OPTION',
  option,
});

export const removeOption = (index) => ({
  type: 'ASSESS_INSTANT_REMOVE_OPTION',
  index,
});

export const chooseCorrectOption = (correctOption) => ({
  type: 'ASSESS_CHOOSE_CORRECT_OPTION',
  correctOption,
});

export const unselectCorrectOption = () => ({
  type: 'ASSESS_UNSELECT_CORRECT_OPTION',
});

export const answerReceived = (
  userId,
  optionIndex,
) => ({
  type: 'ASSESS_INSTANT_ANSWER_RECEIVED',
  userId,
  optionIndex,
});
