export const add = (
  id,
  tags,
  question,
  options,
  created,
) => ({
  type: 'ASSESSMENT_BANK_ADD',
  id,
  tags,
  question,
  options,
  created,
});

export const remove = (id) => ({
  type: 'ASSESSMENT_BANK_REMOVE',
  id,
});

export const retrieved = (bank) => ({
  type: 'ASSESSMENT_BANK_RETRIEVED',
  bank,
});

export const filter = (filter) => ({
  type: 'ASSESSMENT_BANK_FILTER',
  filter,
});

export const filterByTag = (tag) => ({
  type: 'ASSESSMENT_BANK_FILTER_BY_TAG',
  tag,
});

export const addOption = (content) => ({
  type: 'ASSESSMENT_BANK_ADD_OPTION',
  option: { content },
})

export const removeOption = (id, index) => ({
  type: 'ASSESSMENT_BANK_REMOVE_OPTION',
  id,
  index,
})

export const questionEdited = (id, question) => ({
  type: 'ASSESSMENT_BANK_QUESTION_EDITED',
  id,
  question,
})

export const optionEdited = (id, index, value) => ({
  type: 'ASSESSMENT_BANK_OPTION_EDITED',
  id,
  index,
  value,
})

export const clearEdits = () => ({
  type: 'ASSESSMENT_BANK_CLEAR_EDITS',
})

export const saveEdit = (id, question, options) => ({
  type: 'ASSESSMENT_BANK_SAVE_EDIT',
  id,
  question,
  options,
})

export const editQuestionMode = (id) => ({
  type: 'ASSESSMENT_BANK_EDIT_QUESTION_MODE',
  id,
});

export const editQuestionClear = (id) => ({
  type: 'ASSESSMENT_BANK_EDIT_QUESTION_CLEAR',
  id,
})

export const editOptionMode = (id, index) => ({
  type: 'ASSESSMENT_BANK_EDIT_OPTION_MODE',
  id,
  index,
});

export const editOptionClear = (id) => ({
  type: 'ASSESSMENT_BANK_EDIT_OPTION_CLEAR',
  id,
});

export const showOptions = (id) => ({
  type: 'ASSESSMENT_BANK_SHOW_OPTIONS',
  id,
});

export const hideOptions = (id) => ({
  type: 'ASSESSMENT_BANK_HIDE_OPTIONS',
  id,
});

export const setId = (id) => ({
  type: 'ASSESSMENT_BANK_SET_ID',
  id,
});

export const addTag = (id, tag) => ({
  type: 'ASSESSMENT_BANK_ADD_TAG',
  id,
  tag,
})

export const removeTag = (id, index) => ({
  type: 'ASSESSMENT_BANK_REMOVE_TAG',
  id,
  index,
})

export const addAnotherOption = () => ({
  type: 'ASSESSMENT_BANK_ADD_ANOTHER_OPTION',
});

export const addRemoveOption = (options) => ({
  type: 'ASSESSMENT_BANK_ADD_REMOVE_OPTION',
  options,
})

export const addAnotherTag = (tag) => ({
  type: 'ASSESSMENT_BANK_ADD_ANOTHER_TAG',
  tag,
});

export const addRemoveTag = (tags) => ({
  type: 'ASSESSMENT_BANK_ADD_REMOVE_TAG',
  tags,
});

export const addClear = () => ({
  type: 'ASSESSMENT_BANK_ADD_OPTION',
});

export const enterAddTagMode = (id) => ({
  type: 'ASSESSMENT_BANK_ENTER_ADD_TAG_MODE',
  id,
});

export const cancelAddTagMode = (id) => ({
  type: 'ASSESSMENT_BANK_CANCEL_ADD_TAG_MODE',
  id,
});
