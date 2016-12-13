import { post } from './Ajax';

const routes = {
  GET_BY_USER_ID: '/api/assessmentBank/get/userId',
};

export async function getByUserId(userId) {
  try {
    return await post(routes.GET_BY_USER_ID, { userId })
  } catch (e) {
    console.error('[ERROR] AssessmentBank api getByUserId', e);
    return null;
  }
}
