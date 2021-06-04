// /* eslint-disable no-param-reassign */
// import {createAsyncThunk, ActionReducerMapBuilder} from '@reduxjs/toolkit';
// import apiClient from '../../api/client';

// import {ValidationErrors} from '../../type/error';
// import {SocialType} from '../../type/socialNetwork';

// import {AuthState} from './type';

// export const signOutUserThunk = createAsyncThunk<
//   {accessToken: string},
//   {email: string; password: string; socialType?: SocialType},
//   {
//     rejectValue: ValidationErrors;
//   }
// >('auth/signOutUser', async (option) => {
//   try {
//     const {
//       data: {user, accessToken},
//     } = await apiClient.post('authentication', option);

//     return {user, accessToken};
//   } catch (error) {
//     throw Error(error);
//   }
// });

// export const signOutReducers = (
//   builder: ActionReducerMapBuilder<AuthState>,
// ): void => {
//   builder.addCase(signOutUserThunk.fulfilled, (state) => {
//     state.loading = 'fulfilled';
//     state.error = undefined;
//     state.accessToken = undefined;
//   });

//   builder.addCase(signOutUserThunk.pending, (state) => {
//     state.loading = 'pending';
//     state.error = undefined;
//   });

//   builder.addCase(signOutUserThunk.rejected, (state, action) => {
//     state.loading = 'rejected';
//     state.error = action.error.message;
//   });
// };
