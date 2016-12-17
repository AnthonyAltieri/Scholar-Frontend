/**
 * Created by bharatbatra on 12/14/16.
 */
import { post } from './Ajax';

const routes = {
  'GET_ACTIVE': '/api/alert/get/active',
  'CREATE': '/api/alert/create',
};

export const DEFAULT_ALERT_WINDOW = 60;

export async function getActiveAlerts(courseSessionId, alertWindow = DEFAULT_ALERT_WINDOW) {
  try {
    return await post( routes.GET_ACTIVE, { courseSessionId, alertWindow } );
  }
  catch (e) {
    console.error("[ERROR] in api/Alert > getActiveAlerts : " + e);
    return null;
  }
}

export async function createAlert(courseSessionId, courseId, userId, alertWindow = DEFAULT_ALERT_WINDOW) {
  try {
    return await post (routes.CREATE, {
      userId,
      courseId,
      courseSessionId,
      alertWindow
    });
  }
  catch (e) {
    console.error("[ERROR] in api/Alert > createAlert : " + e);
    return null;
  }
}