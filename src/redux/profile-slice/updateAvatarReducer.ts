/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { updateUsersAvatar } from '../../api/profile'

import { RequestError } from '../../api/type'
import { User } from '../../type/entity/user'
import { ValidationErrors } from '../../type/error'

import { ProfileState } from './type'

export const updateAvatarThunk = createAsyncThunk<
  { user: User },
  { uri: string },
  {
    rejectValue: ValidationErrors
  }
>('profile/updateAvatarUser', async ({ uri }) => {
  try {
    const data = await updateUsersAvatar(uri)
    return { user: data }
  } catch (error) {
    const err: RequestError = error
    throw Error(err?.message)
  }
})

export const updateAvatarReducers = (builder: ActionReducerMapBuilder<ProfileState>): void => {
  builder.addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
    state.isloading = false
    state.user = payload.user
  })
  builder.addCase(updateAvatarThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
  })

  builder.addCase(updateAvatarThunk.rejected, (state, action) => {
    state.isloading = false
    state.error = action.error.message
  })
}
