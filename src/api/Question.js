import { post } from './Ajax';

const routes = {
  CREATE: '/api/question/create',
  DISMISS: '/api/question/dismiss',
  ENDORSE_ADD: '/api/question/endorse/add',
  ENDORSE_REMOVE: '/api/question/endorse/remove',
  FLAG_ADD: '/api/question/flag/add',
  FLAG_REMOVE: '/api/question/flag/remove',
  GET_COURSESESSION: '/api/question/get/courseSession',
};

export async function create(
  userId,
  content,
  courseId,
  courseSessionId,
) {
  try {
    return await post(
      routes.CREATE,
      {
        userId,
        content,
        courseId,
        courseSessionId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Question Api create', e);
    return null;
  }
}

export async function dismiss(questionId, courseSessionId) {
  try {
    return await post(
      routes.DISMISS,
      { questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Question Api dismiss', e);
    return null;
  }
}

export async function endorseAdd(
  userId,
  questionId,
  courseSessionId,
) {
  try {
    return await post(
      routes.ENDORSE_ADD,
      {
        userId,
        questionId,
        courseSessionId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Question Api endorseAdd', e);
    return null;
  }
}

export async function endorseRemove(
  userId,
  questionId,
  courseSessionId,
) {
  try {
    return await post(
      routes.ENDORSE_REMOVE,
      {
        userId,
        questionId,
        courseSessionId,
      }
    )
  } catch (e) {
    console.error('[ERROR] Question Api endorseRemove', e);
    return null;
  }
}

export async function flagAdd(questionId, courseSessionId) {
  try {
    return await post(
      routes.FLAG_ADD,
      { questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Question Api flagAdd', e);
    return null;
  }
}

export async function flagRemove(questionId, courseSessionId) {
  try {
    return await post(
      routes.FLAG_REMOVE,
      { questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Question Api flagRemove', e);
    return null;
  }
}

export async function getCourseSession(courseSessionId) {
  try {
    return await post(routes.GET_COURSESESSION, { courseSessionId });
  } catch (e) {
    console.error('[ERROR] Question Api getCourseSession', e);
    return null;
  }
}
