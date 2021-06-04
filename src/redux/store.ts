import { applyMiddleware, createStore, Action } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer, { RootState } from './rootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const configureStore = () => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware as ThunkMiddleware<RootState>)

  const composedEnhancers = composeWithDevTools(middlewareEnhancer)
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, undefined, composedEnhancers)

  const persistor = persistStore(store)

  return { store, persistor }
}

export const { store, persistor } = configureStore()
export type AppDispatch = typeof store.dispatch
export const storeGlobal = store
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
