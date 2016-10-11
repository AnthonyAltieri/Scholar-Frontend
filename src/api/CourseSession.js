/**
 * @author Anthony Altieri on 9/8/16.
 */

import fb from 'firebase';
import shortid from 'shortid';

/**
 * Starts a courseSession for a particular course.
 * @param courseId {string} The id associated with the course
 * @returns {Promise}
 */
export const start = (courseId) => {
  return new Promise((resolve, reject) => {
    // Generate key for new courseSession
    const key = fb.database()
      .ref('courseSessions/')
      .push()
      .key;
    // Save courseSession
    fb.database()
      .ref(`courseSessions/${key}`)
      .update({
        courseId,
      })
      .then(() => {
        // Update the course to the active courseSession
        fb.database()
          .ref(`courses/${courseId}`)
          .update({
            active: true,
            activeCourseSession: key,
          })
          .then(() => {
            resolve({
              courseSessionId: key,
            })
          })
          .catch((error) => { reject(error) })
      })
      .catch((error) => { reject(error) })
  })
};

const tryGenerateAttendanceCode = (courseId, duration) => {
  return new Promise((resolve, reject) => {
    let attendanceCode = shortid();
    let attempts = 0;
    let noCollision = false;
    fb.database()
      .ref(`attendanceCodes/${attendanceCode}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (value) {
          const oldCodeMinutes = value.created;
          const now = Date.now();
          const minDiff = Math.abs(now - oldCodeMinutes) / 1000 / 60;
          if (minDiff < 1) {
            resolve(undefined)
          } else {
            setAttendanceCode(courseId, attendanceCode)
              .then((result) => {
                resolve({
                  attendanceCode,
                });
              })
              .catch((error) => {
                reject(error);
              })
          }
        } else {
          setAddCode(courseId, addCode)
            .then((result) => {
              resolve({
                attendanceCode,
              });
            })
            .catch((error) => {
              reject(error);
            })
        }
      }, (error) => {
        reject(error);
      });
  });
};

export const generateAttendanceCode = (courseSessionId) => {
  return new Promise((resolve, reject) => {
    const code = shortid();
    fb.database()
      .ref(`attendanceCodes/${code}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (value) {

        }
      })

  });
};

export const end = (courseId) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`courses/${courseId}`)
      .update({
        activeSession: null,
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      })
  });
};

