import { post } from './Ajax';

const routes = {
  QUESTION_ADD: '/api/vote/question/add',
  QUESTION_REMOVE: '/api/vote/question/remove',
  RESPONSE_ADD: '/api/vote/response/add',
  RESPONSE_REMOVE: '/api/vote/response/remove',
};

export async function questionAdd(
  userId,
  courseId,
  courseSessionId,
  targetType,
  targetId,
) {
  try {
    return await post(
      routes.QUESTION_ADD,
      {
        userId,
        courseId,
        courseSessionId,
        targetType,
        targetId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Vote Api questionAdd', e);
    return { error: true };
  }
}

export async function questionRemove(userId, id) {
  try {
    return await post(
      routes.QUESTION_REMOVE,
      { userId, id }
    );
  } catch (e) {
    console.error('[ERROR] Vote Api questionRemove', e);
    return { error: true };
  }
};

export async function responseAdd(
  userId,
  courseId,
  courseSessionId,
  targetType,
  targetId,
) {
  try {
    return await post(
      routes.RESPONSE_ADD,
      {
        userId,
        courseId,
        courseSessionId,
        targetType,
        targetId,
      }
    );
  } catch (e) {
    console.error('[ERROR] Vote Api responseAdd', e);
    return { error: true };
  }
}

export async function responseRemove(userId, id) {
  try {
    return await post(
      routes.RESPONSE_REMOVE,
      { userId, id }
    );
  } catch (e) {
    console.error('[ERROR] Vote Api responseRemove', e);
    return { error: true };
  }
}
