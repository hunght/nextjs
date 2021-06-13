import * as AuthSession from 'expo-auth-session'
import { get } from 'lodash'
const REDIRECT_URL = AuthSession.makeRedirectUri()
console.log(`==== REDIRECT_URL ===`)
console.log(REDIRECT_URL)
console.log('==== end log ===')

const github = {
  id: 'd55688c9b517a581e99d',
  secret: '0fd1ab41d56e3f110388aedaae66aec8b79d2004',
}
const githubFields = ['user', 'public_repo']
// 1

// 2
function authUrlWithId(id, fields) {
  return (
    `https://github.com/login/oauth/authorize` +
    `?client_id=${id}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    // 3
    `&scope=${encodeURIComponent(fields.join(' '))}`
  )
}
// 1

async function createTokenWithCode(code) {
  // 2
  const url =
    `https://github.com/login/oauth/access_token` +
    `?client_id=${github.id}` +
    `&client_secret=${github.secret}` +
    `&code=${code}`
  // 3
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export const loginWithGithub = async (): Promise<string> => {
  const data = await AuthSession.startAsync({
    authUrl: authUrlWithId(github.id, githubFields),
  })

  const { access_token } = await createTokenWithCode(get(data, ['code']))
  return access_token
}
