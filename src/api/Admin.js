/**
 * @author Anthony Altieri on 9/24/16.
 */

import fb from './firebase';
const db = fb.database();

export const isValidInstructorId = (id) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`users/${id}`)
      .once('value')
      .then((snapshot) => {
        const user = snapshot.val();
        const result = user ? user.type === 'INSTRUCTOR' : undefined;
        resolve({ result, name: `${user.firstname} ${user.lastname}`});
      })
      .catch((error) => { reject(error) })
  })
};
