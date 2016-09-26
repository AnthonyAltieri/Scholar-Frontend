/**
 * @author Anthony Altieri on 9/7/16.
 */

import fb from './firebase';
const auth = fb.auth();
const db = fb.database();

export const fetchCourses = (filter) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`users/${auth.currentUser.uid}/courses`)
      .once('value')
      .then((snapshot) => {
        resolve(snapshot.val() ? snapshot.val().filter(c => !!c.activeSession) : []);
      })
      .catch((error) => {
        reject(error)
      })
  });
};

export const fetchAllCourses = () => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`courses`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (!value) return [];
        const keys = Object.keys(value);
        let courses = [];
        keys.forEach((k) => {
          value[k].id = k;
          courses.push(value[k]);
        });
        resolve(courses);
      })
      .catch((error) => {
        reject(error);
      })
  })
};

export const joinCourse = (courseId) => {
  return new Promise((resolve, reject) => {
  })
};
