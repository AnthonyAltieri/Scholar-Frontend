/**
 * @author Anthony Altieri on 9/23/16.
 */

import fb from './firebase';
import { objToArray } from '../util/fbtool';
import shortid from 'shortid';

export const createCourse = (title, code, instructorId, instructorName, time) => {
  return new Promise((resolve, reject) => {
    const key = fb.database().ref('courses/').push().key;
    const defaultSettings = {
      threshold: 20,
      platformRestrictions: {
        desktop: true,
        mobile: true,
      },
      hasProfanityFilter: false,
      hasQuestionList: true,
      hasAlerts: true,
    };
    fb.database()
      .ref(`courses/${key}`)
      .set({
        activeSession: null,
        sessions: [],
        enrolledStudents: [],
        settings: defaultSettings,
        title,
        code,
        instructorId,
        instructorName,
        time,
      })
      .then(() => { resolve({ id: key }) })
      .catch((error) => { reject(error) })
  })
};

export const deleteCourse = (courseId) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`courses/${courseId}`)
      .remove()
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        reject(error);
      })
  })
};

const setAddCode = (courseId, addCode) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`courses/${courseId}`)
      .update({
        addCode,
      })
      .then(() => {
        fb.database()
          .ref(`addCodes/${addCode}`)
          .set({
            created: Date.now(),
            courseId,
          })
          .then(() => {
            resolve(true);
          }, (error) => {
            reject(error);
          })
      }, (error) => {
        reject(error);
      })
  })
};

const tryGenerateAddCode = (courseId, duration) => {
  return new Promise((resolve, reject) => {
    let addCode;
    let attempts = 0;
    let noCollision = false;
    addCode = shortid();
    fb.database()
      .ref(`addCodes/${addCode}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (value) {
          const oldCodeHours = value.created;
          const now = Date.now();
          const hourDiff = Math.abs(now - oldCodeHours) / 36e5;
          if (hourDiff < 24) {
            resolve({
              success: false,
            })
          } else {
            setAddCode(courseId, addCode)
              .then((result) => {
                resolve({
                  success: true,
                  addCode,
                });
              })
              .catch((error) => {
                console.error('tryGenerateCode, error', error);
                reject(error);
              })
          }
        } else {
          setAddCode(courseId, addCode)
            .then((result) => {
              resolve({
                success: true,
                addCode,
              });
            })
            .catch((error) => {
              console.error('tryGenerateCode, error', error);
              reject(error);
            })
        }
      }, (error) => {
        console.error('tryGenerateCode, error', error);
        reject(error);
      });
  });
};

// TODO: Implement duration
export const generateAddCode = (courseId, duration) => {
  return new Promise((resolve, reject) => {
    tryGenerateAddCode(courseId, duration)
      .then((result) => {
        const { success, addCode } = result;
        if (success) {
          resolve(addCode);
          return;
        }
        tryGenerateAddCode(courseId, duration)
          .then((result) => {
            const { success, addCode } = result;
            if (success) {
              resolve(addCode);
              return;
            }
            tryGenerateAddCode(courseId, duration)
              .then((result) => {
                const { success, addCode } = result;
                if (success) {
                  resolve(addCode);
                  return;
                }
                resolve(null)
              })
              .catch((error) => { reject(error) })
          })
          .catch((error) => { reject(error) })
      })
      .catch((error) => { reject(error) })
  });
};

export const addCourse = (addCode, userId) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`addCodes/${addCode}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        console.log('value', value);
        if (!value) {
          resolve(null);
          return;
        }
        const course = {
          id: value.courseId,
        };
        if (!course) {
          resolve(null);
          return;
        }
        fb.database()
          .ref(`users/${userId}/courses`)
          .once('value')
          .then((snapshot) => {
            const courses = objToArray(snapshot.val());
            if (!!courses.filter(c => c.id === course.id)[0]) {
              resolve({
                alreadyEnrolled: true,
              });
              return;
            }
            const key = fb.database()
              .ref(`users/${userId}/courses`)
              .push()
              .key;
            fb.database()
              .ref(`users/${userId}/courses/${key}`)
              .update(course)
              .then(() => {
                resolve({
                  id: course.id,
                })
              })
              .catch((error) => { reject(error) });
          })
      })
      .catch((error) => { reject(error) });
  });
};

export const enterCourse = (courseId) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`courses/${courseId}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (!value) {
          resolve(undefined);
          return;
        }
        const { activeSession } = value;
        if (!activeSession) {
          resolve(null);
          return;
        }
        resolve(activeSession);
      })
      .catch((error) => {
        reject(error);
      })
  })
};

