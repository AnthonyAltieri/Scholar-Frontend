/**
 * @author Anthony Altieri on 9/7/16.
 */

import fb from './firebase';
import { objToArray, objContentToArray } from '../util/fbtool';

// TODO: Optimize this
export const fetchCourses = (filter, userId) => {
  console.log('fetchCourses');
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`users/${userId}/courses`)
      .on('value', (snapshot) => {
        if (!snapshot.val()) {
          resolve([]);
          return;
        };
        const userCourses = objContentToArray(snapshot.val());
        console.log('userCourses', userCourses);
        let hm = {};
        userCourses.forEach((c) => {
          hm[c.id] = true;
        });
        console.log('hm', hm);
        fetchAllCourses()
          .then((courses) => {
            resolve(courses.filter(c => !!hm[c.id]));
          })
          .catch((error) => {
            reject(error)
          })
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
        if (!value) {
          resolve([]);
          return;
        }
        const courses = objToArray(value);
        resolve(courses);
      })
      .catch((error) => {
        reject(error);
      })
  })
};

