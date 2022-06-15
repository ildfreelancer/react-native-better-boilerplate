import { Models } from '@rematch/core'
import { app } from './app'
import { session } from './session'

export interface RootModel extends Models<RootModel> {
  app: typeof app
  session: typeof session
}

export const models: RootModel = { app, session }
