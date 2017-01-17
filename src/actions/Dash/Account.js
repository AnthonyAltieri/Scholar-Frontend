/**
 * @author Anthony Altieri on 1/16/17.
 */

export const setAccountFirstName = (firstName) => ({
  type: 'SET_ACCOUNT_FIRST_NAME',
  firstName,
});

export const setAccountLastname = (lastName) => ({
  type: 'SET_ACCOUNT_LAST_NAME',
  lastName,
});

export const setAccountPhone = (phone) => ({
  type: 'SET_ACCOUNT_PHONE',
  phone,
});

export const setAccountStudentId = (institutionId) => ({
  type: 'SET_ACCOUNT_STUDENT_ID',
  institutionId,
});

