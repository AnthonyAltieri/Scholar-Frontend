/**
 * @author Anthony Altieri on 9/8/16.
 */

import Server from '../util/Server';

const ROUTES = {
  ACTIVATE_ALERT: '/api/courseSession/alert'
};

export const activateAlert = (courseSessionId) => {
  return new Promise((resolve, reject) => {
    Server.post(ROUTES.ACTIVATE_ALERT, { courseSessionId })
      .then((data) => {
        resolve(data);
      }).catch((error) => { reject(error) });
  })
};
