// firebaseService.js
import { auth, database } from './firebase'; // Adjust the path as needed
import { getDatabase, ref, set, onValue } from 'firebase/database';

export const saveStateToFirebase = (state) => {
  //console.log('Save the state sir');
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    return set(ref(database, `users/${uid}/state`), state);
  } else {
    return Promise.reject('No user logged in');
  }
};

export const fetchStateFromFirebase = () => {
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const stateRef = ref(database, `users/${uid}/state`);
    return new Promise((resolve, reject) => {
      onValue(stateRef, (snapshot) => {
        resolve(snapshot.val());
      }, {
        onlyOnce: true
      });
    });
  } else {
    return Promise.resolve(null); // Return null if no user is logged in
  }
};

export const fetchDefaultStateFromFirebase = () => {
  // Replace 'path/to/default/state' with the actual path to your default state in Firebase
  const defaultStateRef = ref(database, `default/state`);
  return new Promise((resolve, reject) => {
    onValue(defaultStateRef, (snapshot) => {
      resolve(snapshot.val());
    }, {
      onlyOnce: true
    });
  });
};
