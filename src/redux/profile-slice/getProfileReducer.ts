/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getUserProfileApi } from '../../api/profile'

import { RequestError } from '../../api/type'
import { User } from '../../type/entity/user'
import { ValidationErrors } from '../../type/error'

import { ProfileState } from './type'

export const getUserProfileThunk = createAsyncThunk<
  { user: User },
  undefined,
  {
    rejectValue: ValidationErrors
  }
>('profile/getUserProfileApi', async () => {
  try {
    const data = await getUserProfileApi()
    return { user: data }
  } catch (error) {
    const err: RequestError = error
    throw Error(err?.message)
  }
})

export const getProfileReducer = (builder: ActionReducerMapBuilder<ProfileState>): void => {
  builder.addCase(getUserProfileThunk.fulfilled, (state, { payload }) => {
    state.isloading = false
    state.user = payload.user
  })
  builder.addCase(getUserProfileThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
  })

  builder.addCase(getUserProfileThunk.rejected, (state, action) => {
    state.isloading = false
    state.error = action.error.message
  })
}
