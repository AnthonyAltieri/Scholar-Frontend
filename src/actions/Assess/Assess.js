export const activate = (assessmentType) => ({
  type: 'ASSESS_ACTIVATE_ASSESSMENT',
  assessmentType,
});

export const deactivate = () => ({
  type: 'ASSESS_DEACTIVATE_ASSESSMENT',
})
