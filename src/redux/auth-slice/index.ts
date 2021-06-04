import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import TestConnectNative from '../../helper/connectNative'
import { getGuestTokenReducers } from './getGuestTokenReducer'

import { signInReducers } from './signInUserReducer'

import { signUpReducers } from './signUpReducer'
import { AuthState } from './type'

const initialState: AuthState = { isloading: false }

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOutUser(state, action: PayloadAction<undefined>): void {
      TestConnectNative.sendMessage(undefined)
      state.accessToken = action.payload
      state.isloading = false
    },
    setFullName(state, action: PayloadAction<string>): void {
      state.fullName = action.payload
    },
    resetLoadedApp(state): void {
      state.isloading = false
    },
    finishRegistrationFlow(state): void {
      state.inRegistration = false
    },
  },
  extraReducers: (builder) => {
    signUpReducers(builder)
    signInReducers(builder)
    getGuestTokenReducers(builder)
    // signOutReducers(builder);
  },
})
export { reducer, actions as authAction }
