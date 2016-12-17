import { post } from '../Ajax';

const routes = {
  CREATE: '/api/reflectiveAssessment/create',
  DEACTIVATE: '/api/reflectiveAssessment/deactivate',
  ANSWER: '/api/reflectiveAssessment/answer',
  REVIEW: '/api/reflectiveAssessment/review',
  START_REVIEW: '/api/reflectiveAssessment/startReview',
};

export async function create(
  courseId,
  courseSessionId,
  creatorId,
  question,
  bankId = null,
) {
  try {
    return await post(
      routes.CREATE,
      {
        courseId,
        courseSessionId,
        creatorId,
        question,
        bankId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Reflective Api create', e);
    return null;
  }
}

export async function deactivate(courseSessionId) {
  try {
    return await post(routes.DEACTIVATE, { courseSessionId });
  } catch (e) {
    console.error('[ERROR] Reflective Api deactivate', e);
    return null;
  }
}

export async function answer(
  courseSessionId,
  userId,
  assessmentId,
  courseId,
  content,
) {
  try {
    return await post(
      routes.ANSWER,
      {
        courseSessionId,
        userId,
        assessmentId,
        courseId,
        content,
      }
    );
  } catch (e) {
    console.error('[ERROR] Reflective Api answer', e);
    return { error: true }
  }
}

export async function review(
  courseSessionId,
  courseId,
  userId,
  type,
  answerId,
) {
  try {
    return await post(
      routes.REVIEW,
      {
        courseSessionId,
        courseId,
        userId,
        type,
        answerId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Reflective Api answer', e);
    return { error: true }
  }
}

export async function startReview(
  courseSessionId,
  assessmentId,
) {
  try {
    return await post(
      routes.START_REVIEW,
      {
        courseSessionId,
        assessmentId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Reflective Api startReview', e);
    return null;
  }
}
