/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getCompletenessReducer } from './getCompletenessReducer'

import { CompletenessState } from './type'

const initialState: CompletenessState = { isloading: false }

const { reducer, actions } = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getCompletenessReducer(builder)
  },
})
export { reducer, actions as sessionAction }
