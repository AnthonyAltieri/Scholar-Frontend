export const activate = (assessmentType, activeAssessmentId) => ({
  type: 'ASSESS_ACTIVATE_ASSESSMENT',
  assessmentType,
  activeAssessmentId,
});

export const deactivate = () => ({
  type: 'ASSESS_DEACTIVATE_ASSESSMENT',
})

export const receivedActiveAssessment = (
  id,
  assessmentType,
  question,
  options = [],
) => ({
  type: 'RECEIVED_ACTIVE_ASSESSMENT',
  id,
  assessmentType,
  question,
  options,
})

export const setViewMode = (mode) => ({
  type: 'SET_ASSESS_VIEW_MODE',
  mode,
});

export const foundActiveInstantAssessment = (
  id,
  question,
  assessmentType,
  options,
  answers,
) => ({
  type: 'FOUND_ACTIVE_INSTANT_ASSESSMENT',
  id,
  question,
  assessmentType,
  options,
  answers,
});

export const foundActiveReflectiveAssessment =(
  id,
  question,
  assessmentType,
  numberAnswers,
  numberReviews,
) => ({
  type: 'FOUND_ACTIVE_REFLECTIVE_ASSESSMENT',
  id,
  question,
  assessmentType,
  numberAnswers,
  numberReviews,
});
