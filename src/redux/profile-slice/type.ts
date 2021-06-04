import { Completeness } from '../../type/entity/completeness'
import { User } from '../../type/entity/user'

export interface ProfileState {
  user?: User
  isloading: boolean
  error?: string | undefined
  completeness?: Completeness
}
