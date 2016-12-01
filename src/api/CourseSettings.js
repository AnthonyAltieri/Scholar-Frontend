/**
 * @author Anthony Altieri on 11/13/16.
 */

import { post } from './Ajax';


const routes = {
  GET_ALERT_THRESHOLD: '/api/courseSettings/get/alertThreshold',
};


export async function getAlertThreshold(courseId) {
  try {
    const payload = await post(
      routes.GET_ALERT_THRESHOLD,
      { courseId }
    )
  } catch (e) {
    return e;
  }
}

