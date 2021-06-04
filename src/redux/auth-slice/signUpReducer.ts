/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'

import client from '../../api/client'
import { postUsersMobileTokenApi, postUsersRegistrationApi } from '../../api/registration'
import { RequestError } from '../../api/type'
import { ValidationErrors } from '../../type/error'

import { RootState } from '../rootReducer'

import { AuthState } from './type'

export const signUpThunk = createAsyncThunk<
  { accessToken: string; name?: string },
  void,
  {
    rejectValue: ValidationErrors
    state: RootState
  }
>('auth/signUpUser', async (_, { getState }) => {
  try {
    const { socialToken, socialType, email = '', password = '', guestToken = '' } = getState().auth
    if (socialType === 'facebook' || socialType === 'google' || socialType === 'apple') {
      const token = socialToken
      if (token) {
        const { jwt, action, name } = await postUsersMobileTokenApi({
          token,
          socialType,
          email,
        })
        client.defaults.headers.common['Authorization'] = jwt
        return { accessToken: jwt, name }
      }
      throw Error('No token!')
    }

    const { jwt } = await postUsersRegistrationApi({
      email,
      password,
      jwt: guestToken,
    })
    client.defaults.headers.common['Authorization'] = jwt
    return { accessToken: jwt }
  } catch (error) {
    const err: RequestError = error
    throw Error(err?.message)
  }
})

export const signUpReducers = (builder: ActionReducerMapBuilder<AuthState>): void => {
  builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
    state.isloading = false
    state.error = undefined
    state.inRegistration = true
    state.accessToken = payload.accessToken
    state.fullName = payload.name
  })
  builder.addCase(signUpThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
    state.accessToken = undefined
  })
  builder.addCase(signUpThunk.rejected, (state, action) => {
    state.isloading = false
    state.accessToken = undefined

    if (action.payload) {
      // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
      state.error = action.payload.errorMessage
    } else {
      state.error = action.error.message
    }
  })
}
