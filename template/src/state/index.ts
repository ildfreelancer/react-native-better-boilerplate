import immerPlugin from '@rematch/immer'
import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import persistPlugin from '@rematch/persist'
import { models, RootModel } from '@state/models'
import storage from '@react-native-async-storage/async-storage'
import selectPlugin from '@rematch/select'
import { getPersistor } from '@rematch/persist'
import { Middleware } from 'redux'
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading'

const middlewares: Middleware[] = [
  /* other middlewares */
]

if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

type FullModel = ExtraModelsFromLoading<RootModel>
export const store = init<RootModel, FullModel>({
  models,
  plugins: [
    loadingPlugin(),
    immerPlugin(),
    persistPlugin({
      key: 'root',
      storage,
      blacklist: ['session'],
    }),
    selectPlugin(),
  ],
  redux: {
    middlewares,
    rootReducers: {
      LOGOUT: state => {
        return {
          ...state,
        }
      },
    },
  },
})

export const persistor = getPersistor()

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>
