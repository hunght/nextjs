import { SocialType } from '../../type/socialNetwork'

export interface AuthState {
  accessToken?: string
  lastUpdateToken?: string
  isloading: boolean
  inRegistration?: boolean
  error?: string | undefined
  email?: string
  fullName?: string
  password?: string
  socialType?: SocialType
  socialToken?: string
  guestToken?: string
}
