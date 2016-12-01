/**
 * @author Anthony Altieri on 9/6/16.
 */


import { post } from './Ajax';


const routes = {
  LOG_IN: '/api/user/logIn',
  SIGN_UP: '/api/user/signUp/student',
  LOG_OUT: '/api/user/logOut',
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
      }
    );
    return payload;
  } catch (e) {
    return e;
  }
}



