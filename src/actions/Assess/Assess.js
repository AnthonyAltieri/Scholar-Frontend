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
})
