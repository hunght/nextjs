import { unwrapResult } from '@reduxjs/toolkit'

import { useEffect } from 'react'
import apiClient from '../api/client'
import { showAlertError } from '../helper/alert'
import TestConnectNative from '../helper/connectNative'
import { authAction } from '../redux/auth-slice'
import { getCompletenessThunk } from '../redux/completeness-slice/getCompletenessReducer'
import { getUserProfileThunk } from '../redux/profile-slice/getProfileReducer'
import { useAppDispatch } from '../redux/store'
import Intercom from 'react-native-intercom'
export function useAuthenticationEffect(
  isAuthenticated: boolean,
  accessToken: string | undefined
): void {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isAuthenticated) {
      apiClient.defaults.headers.common['Authorization'] = accessToken

      dispatch(getUserProfileThunk())
        .then(unwrapResult)
        .then(({ user }) => {
          Intercom.registerIdentifiedUser({
            email: user.email ?? '',
            userId: user.slug ?? '',
          })
          Intercom.updateUser({
            name: user.full_name ?? '',
            phone: user.phone ?? '',
          })

          TestConnectNative.sendMessage(JSON.stringify({ accessToken, user }))
          TestConnectNative.hideTabbar(false)
        })
        .catch((error) => {
          showAlertError(error)
          dispatch(authAction.signOutUser())
        })
      dispatch(getCompletenessThunk())
    }
  }, [accessToken, dispatch, isAuthenticated])
}
