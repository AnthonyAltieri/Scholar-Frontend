/**
 * @author Anthony Altieri on 9/6/16.
 */


import { post } from './Ajax';


const routes = {
  LOG_IN: '/api/user/logIn',
  SIGN_UP: '/api/user/signUp/student',
  LOG_OUT: '/api/user/logOut',
  GET_ACCOUNT_INFO: '/api/user/get/accountInfo',
  SAVE_ACCOUNT_INFO: '/api/user/save/accountInfo',
  CHANGE_PASSWORD: '/api/user/change/password',
  REQUEST_FORGOT_PASSWORD: '/api/user/request/forgotPassword',
};

export async function logIn(email, password) {
  try {
    const payload = await post(
      routes.LOG_IN,
      { email, password }
    );
    return payload;
  } catch (e) {
    return e;
  }
}

export async function signUp(
  email,
  password,
  firstName,
  lastName,
  phone,
  institutionId,
  school,
) {
  try {
    const payload = await post(
      routes.SIGN_UP,
      {
        email,
        password,
        firstName,
        lastName,
        phone,
        institutionId,
        school
      }
    );
    return payload;
  } catch (e) {
    return e;
  }
}

export async function getAccountInfo(userId) {
  try {
    return await post(routes.GET_ACCOUNT_INFO, { userId });
  } catch (e) {
    console.error('[ERROR] User Api getAccountInfo', e);
    return null;
  }
}

export async function saveAccountInfo(
  userId,
  firstName,
  lastName,
  phone,
  institutionId,
) {
  try {
    return await post(
      routes.SAVE_ACCOUNT_INFO,
      {
        userId,
        firstName,
        lastName,
        phone,
        institutionId,
      }
    )
  } catch (e) {
    console.error('[ERROR] User Api saveAccountInfo', e);
    return null;
  }
}

export async function changePassword(
  password,
  forgotPasswordCode,
) {
  try {
    return await post(
      routes.CHANGE_PASSWORD,
      { password, forgotPasswordCode }
    );
  } catch (e) {
    console.error('[ERROR] User Api changePassword', e);
    return null;
  }
}

export async function requestForgotPassword(email) {
  try {
    return await post(routes.REQUEST_FORGOT_PASSWORD, { email });
  } catch (e) {
    console.error('[ERROR] User Api requestForgotPassword');
  }
}


