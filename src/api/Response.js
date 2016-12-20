/**
 * @author Anthony Altieri on 11/27/16.
 */

import { post } from './Ajax';

const ROUTER_PREFIX = '/api/response';

const routes = {
  DISMISS: `${ROUTER_PREFIX}/dismiss`,
  ENDORSE_ADD: `${ROUTER_PREFIX}/endorse/add`,
  ENDORSE_REMOVE: `${ROUTER_PREFIX}/endorse/remove`,
};

export async function dismiss(responseId, courseSessionId) {
  try {
    return await post(
      routes.DISMISS,
      { responseId, courseSessionId },
    );
  } catch (e) {
    console.error('[ERROR] dismiss question', e);
    return null;
  }
};

export async function endorseAdd(
  userId,
  questionId,
  courseSessionId,
) {
  try {
    return await post(
      routes.ENDORSE_ADD,
      { userId, questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Response Api endorseAdd', e);
    return null;
  }
};

export async function endorseRemove(
  userId,
  questionId,
  courseSessionId,
) {
  try {
    return await post(
      routes.ENDORSE_REMOVE,
      { userId, questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Response Api endorseRemove', e);
    return null;
  }
}
