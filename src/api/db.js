/**
 * @author Anthony Altieri on 9/13/16.
 */

import firebase from 'firebase';

export const getRoot = () => firebase.database().ref();
