/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'

import client from '../../api/client'
import { postUsersTokenGuestApi } from '../../api/registration'
import { RequestError } from '../../api/type'
import { ValidationErrors } from '../../type/error'

import { SocialType } from '../../type/socialNetwork'
import { prepareSocialToken } from './helper'

import { AuthState } from './type'

export const getGuestTokenThunk = createAsyncThunk<
  {
    email?: string
    password?: string
    socialType?: SocialType
    guestToken: string
    socialToken?: string
  },
  { email: string; password: string; socialType?: SocialType },
  {
    rejectValue: ValidationErrors
  }
>('auth/getGuestTokenUser', async ({ email, password, socialType }) => {
  try {
    if (socialType) {
      const { token, name, email } = await prepareSocialToken(socialType)
      if (token) {
        const { jwt } = await postUsersTokenGuestApi()
        client.defaults.headers.common['Authorization'] = jwt
        return {
          email,
          password,
          socialType,
          socialToken: token,
          guestToken: jwt,
          name,
        }
      }
      throw Error('Login error, no token return!')
    }

    const { jwt } = await postUsersTokenGuestApi()

    client.defaults.headers.common['Authorization'] = jwt
    return { email, password, socialType, guestToken: jwt }
  } catch (error) {
    const err: RequestError = error
    throw Error(err?.message)
  }
})

export const getGuestTokenReducers = (builder: ActionReducerMapBuilder<AuthState>): void => {
  builder.addCase(getGuestTokenThunk.fulfilled, (state, { payload }) => {
    state.isloading = false
    state.error = undefined
    state.inRegistration = true
    state.email = payload.email
    state.guestToken = payload.guestToken
    state.password = payload.password
    state.socialToken = payload.socialToken
    state.socialType = payload.socialType
  })
  builder.addCase(getGuestTokenThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
    state.accessToken = undefined
  })
  builder.addCase(getGuestTokenThunk.rejected, (state, action) => {
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
