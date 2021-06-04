/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'

import crashlytics from '@react-native-firebase/crashlytics'

import { AuthState } from './type'
import { SocialType } from '../../type/socialNetwork'
import { prepareSocialToken } from './helper'

import { ValidationErrors } from '../../type/error'
import { signInUserApi } from '../../api/profile'
import client from '../../api/client'
import { postUsersMobileTokenApi } from '../../api/registration'

export const signInUserThunk = createAsyncThunk<
  { accessToken: string },
  { email: string; password: string; socialType?: SocialType },
  {
    rejectValue: ValidationErrors
  }
>('auth/signInUser', async (option) => {
  try {
    if (option.socialType) {
      const { token, name, email } = await prepareSocialToken(option.socialType)
      if (!token) {
        throw Error('empty token')
      }
      const { jwt, action } = await postUsersMobileTokenApi({
        token,
        socialType: option.socialType,
        name,
        email,
      })
      client.defaults.headers.common['Authorization'] = jwt
      return { accessToken: jwt }
    }

    const { email, password } = option

    const accessToken = await signInUserApi({ email, password })

    client.defaults.headers.common['Authorization'] = accessToken
    crashlytics().log('User signed in.')

    return { accessToken }
  } catch (error) {
    throw Error(error.message)
  }
})

export const signInReducers = (builder: ActionReducerMapBuilder<AuthState>): void => {
  builder.addCase(signInUserThunk.fulfilled, (state, { payload }) => {
    state.isloading = false
    state.error = undefined
    state.inRegistration = false
    state.accessToken = payload.accessToken
  })
  builder.addCase(signInUserThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
    state.accessToken = undefined
  })
  builder.addCase(signInUserThunk.rejected, (state, action) => {
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
