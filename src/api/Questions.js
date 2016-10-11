/**
 * @author Anthony Altieri on 9/30/16.
 */

import firebase from 'firebase';
import { objContentToArray } from '../util/fbtool';

export const fetchQuestions = (courseSessionId) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`courseSession/${courseSessionId}/questions`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (!value) {
          resolve([]);
          return;
        }
        resolve(objContentToArray(value));
      })
      .catch((error) => { reject(error) })
  })
};
