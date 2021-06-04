import { Completeness } from '../../type/entity/completeness'

export interface CompletenessState {
  isloading: boolean
  error?: string | undefined
  completeness?: Completeness
}
