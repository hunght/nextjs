import Navigation from './view'

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { selectIsAuthenticated } from '../redux/auth-slice/selector'
import { setCurrentNavigation } from '../redux/navigation-slice'

const connector = connect(
  (state: RootState) => ({
    accessToken: state.auth.accessToken,
    isAuthenticated: selectIsAuthenticated(state),
  }),
  { setCurrentNavigation }
)

export default connector(Navigation)

export type PropsFromRedux = ConnectedProps<typeof connector>
