import { createModel } from '@rematch/core'
import { RootModel } from './index'

type AppState = {
  session?: {
    country_code: string
    country_name: string
    latitude: number
    longitude: number
    city: string
    state: string
  }
}
const APP_STATE_TYPED: AppState = {
  session: undefined,
}
export const app = createModel<RootModel>()({
  state: APP_STATE_TYPED,
  reducers: {
    updateSession(state, payload: AppState['session']) {
      state.session = payload
    },
  },
})
