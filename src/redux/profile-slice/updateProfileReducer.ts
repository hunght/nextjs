/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { updateUsersProfileApi } from '../../api/registration'
import { RequestError, UserProfileRequestParams } from '../../api/type'
import { User } from '../../type/entity/user'
import { ValidationErrors } from '../../type/error'

import { ProfileState } from './type'

export const updateProfileThunk = createAsyncThunk<
  { user: User },
  UserProfileRequestParams,
  {
    rejectValue: ValidationErrors
  }
>('profile/updateProfileUser', async (option) => {
  try {
    const data = await updateUsersProfileApi(option)
    return { user: data }
  } catch (error) {
    const err: RequestError = error
    throw Error(err?.message)
  }
})

export const updateProfileReducers = (builder: ActionReducerMapBuilder<ProfileState>): void => {
  builder.addCase(updateProfileThunk.fulfilled, (state, { payload }) => {
    state.isloading = false
    state.user = payload.user
  })
  builder.addCase(updateProfileThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
  })

  builder.addCase(updateProfileThunk.rejected, (state, action) => {
    state.isloading = false
    state.error = action.error.message
  })
}
