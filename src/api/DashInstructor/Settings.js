/**
 * @author Anthony Altieri on 10/8/16.
 */

import fb from 'firebase';

export const getSettings = (courseId) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`courses/${courseId}/settings`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (!value) {
          reject(new Error('Course has no settings!'));
          return;
        }
        resolve(value);
      })
  });
};
