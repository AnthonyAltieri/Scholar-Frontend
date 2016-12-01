/**
 * @author Anthony Altieri on 11/27/16.
 */

import { post } from './Ajax';

const ROUTER_PREFIX = '/api/response';

const routes = {
  DISMISS: `${ROUTER_PREFIX}/dismiss`,
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
