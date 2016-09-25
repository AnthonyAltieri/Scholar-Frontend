/**
 * @author Anthony Altieri on 9/6/16.
 */


import fb from './firebase';
const fbAuth = fb.auth();
const db = fb.database();

const ROUTES = {
  LOG_IN: '/api/user/logIn',
  LOG_OUT: '/api/user/logOut',
};


export const logIn = (email, password) => {
  return new Promise ((resolve, reject) => {
    fbAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        db.ref(`users/${fbAuth.currentUser.uid}`).once('value')
          .then((snapshot) => {
            resolve({
              id: fbAuth.currentUser.uid,
              ...snapshot.val(),
              email,
            })
          })
      })
      .catch((error) => {
        if (error) {
          reject(error);
          return;
        }
      })
  });
};

export const signUp = (email, password, firstname, lastname) => {
  return new Promise((resolve, reject) => {
    fbAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = fbAuth.currentUser;
        console.log('user', user);
        db.ref(`users/${user.uid}`)
          .set({
            firstname,
            lastname,
            type: 'STUDENT'
          });
        resolve(fbAuth.currentUser);
      })
      .catch((error) => {
        if (error) {
          reject(error);
          return;
        }
      })
  });
};

export const logOut = () => {
  return new Promise((resolve, reject) => {
    fbAuth.signOut()
      .then(() => {
        resolve(true);
      }, (error) => {
        reject(error);
      })
  });
};
