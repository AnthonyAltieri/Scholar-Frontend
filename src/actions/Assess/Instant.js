export const addOption = (option) => ({
  type: 'ASSESS_INSTANT_ADD_OPTION',
  option,
});

export const removeOption = (index) => ({
  type: 'ASSESS_INSTANT_REMOVE_OPTION',
  index,
});
