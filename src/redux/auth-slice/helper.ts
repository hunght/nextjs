import { isEmpty, isNil } from 'ramda'

import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import appleAuth from '@invertase/react-native-apple-authentication'
import { SocialType } from '../../type/socialNetwork'

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK()

export const loginGoogleSDK = async (): Promise<{
  token?: string
  name?: string
  email?: string
}> => {
  try {
    GoogleSignin.configure()
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    const token = userInfo.idToken
    if (!isNil(token) && !isEmpty(token)) {
      return {
        token,
        email: userInfo.user.email,
        name: userInfo.user.name ?? undefined,
      }
    }
    return {}
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
    return {}
  }
}
export const loginFacebookSDK = async (): Promise<{
  token?: string
  name?: string
  email?: string
}> => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
    if (result.isCancelled) {
      console.log('Login cancelled')
    } else {
      console.log('Login success with permissions: ' + result?.grantedPermissions?.toString())
      const data = await AccessToken.getCurrentAccessToken()
      const token = data?.accessToken?.toString()
      const { email } = await fetch(
        'https://graph.facebook.com/v9.0/me?fields=email,name&access_token=' + token
      ).then((response) => response.json())

      if (!isNil(token) && !isEmpty(token)) {
        return { token, email }
      }
    }
    return {}
  } catch (error) {
    console.log('Login fail with error: ' + error)
    return {}
  }
}

export const loginAppleSDK = async (): Promise<{
  token?: string
  name?: string
  email?: string
}> => {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  // const credentialState = await appleAuth.getCredentialStateForUser(
  //   appleAuthRequestResponse.user,
  // );

  // use credentialState response to ensure the user is authenticated
  const token = appleAuthRequestResponse.authorizationCode ?? undefined
  const name = `${appleAuthRequestResponse.fullName?.familyName}
    ${appleAuthRequestResponse.fullName?.givenName}`

  return { token, name, email: appleAuthRequestResponse.email ?? undefined }
}

export const prepareSocialToken = async (
  type: SocialType
): Promise<{
  token?: string
  name?: string
  email?: string
}> => {
  if (type === 'facebook') {
    const token = await loginFacebookSDK()
    return token
  }
  if (type === 'google') {
    const token = await loginGoogleSDK()
    return token
  }
  if (type === 'apple') {
    const token = await loginAppleSDK()
    return token
  }
  return { token: '' }
}
