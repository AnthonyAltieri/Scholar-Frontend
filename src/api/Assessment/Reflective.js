import { post } from '../Ajax';

const routes = {
  CREATE: '/api/reflectiveAssessment/create',
  DEACTIVATE: '/api/reflectiveAssessment/deactivate',
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
