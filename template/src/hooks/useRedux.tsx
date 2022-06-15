import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { Dispatch, RootState } from '@state/index'
import { store } from '@state/index'
export const useReduxDispatch = () => useDispatch<Dispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export const useReduxStore = () => store
