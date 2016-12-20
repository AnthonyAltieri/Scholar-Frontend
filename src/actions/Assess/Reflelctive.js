export const assessmentReviewed = () => ({
  type: 'REFLECTIVE_ASSESSMENT_REVIEWED',
});

export const answered = () => ({
  type: 'SUCCESSFULLY_SUBMITTED_REFLECTIVE_ANSWER',
});

export const review = (reviewIndex) => ({
  type: 'SUCCESSFULLY_SUBMITTED_REFLECTIVE_REVIEW',
  reviewIndex,
})

export const receivedAnswersToReview = (toReview) => ({
  type: 'ASSESSMENT_REFLECTIVE_RECEIVED_ANSWERS_TO_REVIEW',
  toReview,
})

export const startReview = (toReview) => ({
  type: 'REFLECTIVE_ASSESSMENT_START_REVIEW',
  toReview,
});

export const answerReceived = () => ({
  type: 'REFLECTIVE_ASSESSMENT_ANSWERED',
});

export const answerReviewed = () => ({
  type: 'REFLECTIVE_ASSESSMENT_REVIEWED',
});
