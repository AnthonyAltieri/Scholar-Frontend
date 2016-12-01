/**
 * @author Anthony Altieri on 11/18/16.
 */

import { post } from './Ajax';

const routes = {
  REFFERAL_CODE_CHECK: '/api/referralCode/check'
};

export async function referralCodeCheck(referralCode) {
  try {
    return await post(routes.REFFERAL_CODE_CHECK, { referralCode })
  } catch (e) {
    return null;
  }
}
