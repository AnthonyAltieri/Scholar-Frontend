/**
 * @author Anthony Altieri on 9/23/16.
 */

import fb from './firebase';
const db = fb.database();

export const addCourse = (title, code, instructorId, instructorName, time) => {
  return new Promise((resolve, reject) => {
    const key = db.ref('courses/').push().key;
    db.ref(`courses/${key}`)
      .set({
        activeSession: null,
        sessions: [],
        enrolledStudents: [],
        title,
        code,
        instructorId,
        instructorName,
        time,
      })
      .then(() => { resolve({ id }) })
      .catch((error) => { reject(error) })
  })
};

export const deleteCourse = (courseId) => {
  return new Promise((resolve, reject) => {
    db.ref(`courses/${courseId}`)
      .remove()
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        reject(error);
      })


  })
};

