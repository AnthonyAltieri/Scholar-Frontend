import { post } from '../Ajax';

const routes = {
  'CREATE': '/api/instantAssessment/create',
  'DEACTIVATE': '/api/instantAssessment/deactivate',
}

export async function create(
    courseId,
    courseSessionId,
    creatorId,
    question,
    options,
    bankId || null,
) {
  try {
    return await post(
      routes.CREATE,
      {
        courseId,
        courseSessionId,
        creatorId,
        question,
        options,
        bankId,
      }
    )
  } catch (e) {
    console.error('[ERROR] Instant Api create', e);
  }
}

export async function deactivate(courseSessionId) {
  try {
    return await post(routes.DEACTIVATE, { courseSessionId });
  } catch (e) {
    console.error('[ERROR] Instant Api deactivate', e);
  }
}
