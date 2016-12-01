/**
 * @author Anthony Altieri on 10/8/16.
 */

import { post } from '../Ajax';

const routes = {
  GET: '/api/instructorSettings/get',
  SAVE: '/api/instructorSettings/save',
  CREATE: '/api/instructorSettings/create',
};

export async function get(userId) {
  try {
    return post(routes.GET, { userId });
  } catch (e) {
    return null;
  }
}

export async function save(
  userId,
  threshold,
  platformRestrictions,
  hasProfanityFilter,
  hasQuestionList,
  hasAlerts,
) {
  try {
    return post(
      routes.SAVE,
      {
        userId,
        threshold,
        platformRestrictions,
        hasProfanityFilter,
        hasQuestionList,
        hasAlerts,
      }
    );
  } catch (e) {
    return null;
  }
}

export async function create(
  userId,
  threshold,
  platformRestrictions,
  hasProfanityFilter,
  hasQuestionList,
  hasAlerts,
) {
  try {
    return post(
      routes.CREATE,
      {
        userId,
        threshold,
        platformRestrictions,
        hasProfanityFilter,
        hasQuestionList,
        hasAlerts,
      }
    );
  } catch (e) {
    return null;
  }
}

