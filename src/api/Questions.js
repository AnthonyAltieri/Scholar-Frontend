/**
 * @author Anthony Altieri on 9/30/16.
 */

import { post } from './Ajax';

const ROUTER_PREFIX = '/api/question';

const routes = {
  GET_COURSE_SESSION: `${ROUTER_PREFIX}/get/courseSession`,
  DISMISS: `${ROUTER_PREFIX}/dismiss`,
  ENDORSE_ADD: `${ROUTER_PREFIX}/endorse/add`,
  ENDORSE_REMOVE: `${ROUTER_PREFIX}/endorse/remove`,
}

/**
 * Get the questions trees from a course session
 *
 * @param courseSessionId
 * @returns { error, questions }
 */
export async function fetchQuestions(courseSessionId) {
  try {
    return await post(
      routes.GET_COURSE_SESSION,
      { courseSessionId }
    )
  } catch (e) {
    console.error('[ERROR] fetch questions', e);
    return null;
  }
}

export async function dismiss(questionId, courseSessionId) {
  try {
    return await post(
      routes.DISMISS,
      { questionId, courseSessionId },
    );
  } catch (e) {
    console.error('[ERROR] dismiss question', e);
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
      { userId, questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Question Api endorseAdd', e);
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
    console.error('[ERROR] Question Api endorseRemove', e);
    return null;
  }
}
