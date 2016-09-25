/**
 * @author Anthony Altieri on 9/23/16.
 */

import { v1 } from 'uuid'
import fb from './firebase';
const auth = fb.auth();
const db = fb.database();

export const activate = (courseId) => {
  db.ref(`courses/${courseId}`)
}
