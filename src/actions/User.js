/**
 * @author Anthony Altieri on 9/7/16.
 */

export const logOut = () => {
  return {
    type: 'LOG_OUT',
  }
};
export const logInSuccess = (username, id, name, type, phone, institutionId) => {
  return {
    type: 'LOG_IN_SUCCESS',
    userType: type,
    username,
    id,
    name,
    phone,
    institutionId,
  }
};

export const logInFail = () => {
  return {
    type: 'LOG_IN_FAIL',
  }
};

export const signUpSuccess = (username, id, name, type) => {
  return {
    type: 'SIGN_UP_SUCCESS',
    userType: type,
    username,
    id,
    name,
  }
};

export const signUpFail = () => {
  return {
    type: 'SIGN_UP_FAIL',
  }
};

export const receivedAccountInfo = (
  firstName,
  lastName,
  email,
  phone,
  institutionId,
) => ({
  type: 'RECEIVED_ACCOUNT_INFO',
  firstName,
  lastName,
  phone,
  institutionId,
  username: email,

});
