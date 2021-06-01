import firebase from 'firebase/app'

// Optionally import the services that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { useEffect } from 'react'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDuX7_Tqtp-CPnmOgpWtQXE-T0zwX8YTeM',
  authDomain: 'hiddenchessgame.firebaseapp.com',
  databaseURL: 'https://hiddenchessgame.firebaseio.com',
  projectId: 'hiddenchessgame',
  storageBucket: 'hiddenchessgame.appspot.com',
  messagingSenderId: '1040915402329',
  appId: '1:1040915402329:web:493ebe219a5fc4bb166b48',
}
if (!firebase.apps.length) {
  firebase
    .initializeApp(firebaseConfig)
    .auth()
    .onAuthStateChanged((user) => {
      if (user != null) {
        console.log('We are authenticated now!')
      }

      // Do other things
    })
} else {
  firebase.app() // if already initialized, use that one
}

// function storeHighScore(userId, score) {
//   firebase
//     .database()
//     .ref('users/' + userId)
//     .set({
//       highscore: score,
//     })
// }

// function setupHighscoreListener(userId) {
//   firebase
//     .database()
//     .ref('users/' + userId)
//     .on('value', (snapshot) => {
//       const highscore = snapshot.val().highscore
//       console.log('New high score: ' + highscore)
//     })
// }
export default function Home() {
  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .then(({ user }) => {
        // Signed in..
        console.log(`==== user ===`)
        console.log(user.uid)
        console.log('==== end log ===')
      })
      .catch((error) => {
        // ...
        console.log(`==== error ===`)
        console.log(error)
        console.log('==== end log ===')
      })
  }, [])
  return <div>Login with github</div>
}
