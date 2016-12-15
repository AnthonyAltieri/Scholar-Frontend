/**
 * @author Anthony Altieri on 9/7/16.
 */

import { post } from './Ajax';

const routes = {
  GET_BY_USER: '/api/course/get/user'
}

export async function getByUser(userId) {
  try {
    return await post(routes.GET_BY_USER, { userId });
  } catch (e) {
    console.error('[ERROR] Courses Api getByUser', e);
    return null;
  }
}
