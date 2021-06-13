import firebase from 'firebase/app'
import { fire } from './fire'

export const loginWithGithub = (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.GithubAuthProvider()

  provider.addScope('repo')
  provider.setCustomParameters({
    allow_signup: 'true',
  })
  return fire.auth().signInWithPopup(provider)
}
