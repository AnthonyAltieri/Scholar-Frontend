/**
 * @author Anthony Altieri on 9/6/16.
 */


import fb from './firebase';
const db = fb.database();

const ROUTES = {
  LOG_IN: '/api/user/logIn',
  LOG_OUT: '/api/user/logOut',
};


export const logIn = (email, password) => {
  return new Promise ((resolve, reject) => {
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        db.ref(`users/${fb.auth().currentUser.uid}`).once('value')
          .then((snapshot) => {
            resolve({
              id: fb.auth().currentUser.uid,
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
    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = fb.auth().currentUser;
        console.log('user', user);
        db.ref(`users/${user.uid}`)
          .set({
            type: 'STUDENT',
            firstname,
            lastname,
            email,
          });
        resolve(fb.auth().currentUser);
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
    fb.auth()
      .signOut()
      .then(() => {
        resolve(true);
      }, (error) => {
        reject(error);
      })
  });
};

export const addUser = (email, password, firstname, lastname, type) => {
  return new Promise((resolve, reject) => {
    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = fb.auth().currentUser;
        console.log('user', user);
        db.ref(`users/${user.uid}`)
          .set({
            firstname,
            lastname,
            type,
          });
        console.log('done');
        resolve(fb.auth().currentUser);
      })
      .catch((error) => {
        if (error) {
          console.log('error', error);
          reject(error);
        }
      })
  });
};

export const deleteUser = () => {
  return new Promise((resolve, reject) => {
    const user = fb.auth().currentUser;
    user.delete()
      .then(() => {
        resolve(true)
      }, (error) => {
       reject(error)
      });
  })
};

export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(`users`)
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

export const resetPassword = (email) => {
  return new Promise((resolve, reject) => {
    fb.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve(true);
      }, (error) => {
        reject(error);
      })
  })
};

export const setUserStatusListener = (onLoggedIn, onLoggedOut) => {
  fb.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        onLoggedIn();
      } else {
        onLoggedOut();
      }
    })
};

// export const isLoggedIn = () => {
//   return new Promise((resolve, reject) => {
//     console.log('isLoggedIn');
//     console.log(getAuth().currentUser);
//     if (!getAuth().currentUser) {
//       resolve(null);
//       return;
//     }
//     fb.database()
//       .ref(`users/${fb.auth().currentUser.uid}`)
//       .once('value')
//       .then((snapshot) => {
//         resolve(snapshot.val())
//       })
//       .catch((error) => { reject(error) })
//
//   })
// };