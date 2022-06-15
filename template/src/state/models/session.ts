import { createModel } from '@rematch/core'
import { RootModel } from './index'

type SessionState = {
  two_factor_authentication: {
    security: boolean
  }
}
const SESSION_STATE_TYPED: SessionState = {
  workspace: undefined,
  two_factor_authentication: {
    security: false,
  },
}
export const session = createModel<RootModel>()({
  state: SESSION_STATE_TYPED,
  reducers: {},
})
