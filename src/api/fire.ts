import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAONSGt5j4vLsW8tHHwD7VV6092zAdSLzY',
  authDomain: 'https://auth.expo.io/@hunght/nexttop-dev',
  databaseURL: 'https://brilliant-heat-3772.firebaseio.com',
  projectId: 'brilliant-heat-3772',
  storageBucket: 'brilliant-heat-3772.appspot.com',
  messagingSenderId: '120746288916',
  appId: '1:120746288916:web:660364cdffc4de45638401',
}
export const fire = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
