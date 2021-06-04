/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getUserCompletenessApi } from '../../api/profile'

import { RequestError } from '../../api/type'
import { Completeness } from '../../type/entity/completeness'

import { ValidationErrors } from '../../type/error'

import { CompletenessState } from './type'

export const getCompletenessThunk = createAsyncThunk<
  { completeness: Completeness },
  undefined,
  {
    rejectValue: ValidationErrors
  }
>('profile/getCompletenessApi', async () => {
  try {
    const data = await getUserCompletenessApi()
    return { completeness: data }
  } catch (error) {
    const err: RequestError = error
    throw Error(err?.message)
  }
})

export const getCompletenessReducer = (
  builder: ActionReducerMapBuilder<CompletenessState>
): void => {
  builder.addCase(getCompletenessThunk.fulfilled, (state, { payload }) => {
    state.completeness = payload.completeness
    state.isloading = false
  })

  builder.addCase(getCompletenessThunk.pending, (state) => {
    state.isloading = true
    state.error = undefined
  })

  builder.addCase(getCompletenessThunk.rejected, (state, action) => {
    state.isloading = false
    state.error = action.error.message
  })
}
