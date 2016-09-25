/**
 * @author Anthony Altieri on 9/7/16.
 */

import fb from './firebase';
const auth = fb.auth();
const db = fb.database();

export const fetchCourses = (filter) => {
  return new Promise((resolve, reject) => {
    console.log('auth.currentUser', fb.auth().currentUser);
    db.ref(`users/${auth.currentUser.uid}/courses`)
      .once('value')
      .then((snapshot) => {
        resolve(snapshot.val() ? snapshot.val().filter(c => !!c.activeSession) : []);
      })
      .catch((error) => {
        reject(error)
      })
  });
};

export const joinCourse = (courseId) => {
  return new Promise((resolve, reject) => {
  })
};
