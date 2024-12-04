import {configureStore} from '@reduxjs/toolkit'
import {rootApi} from './apiSlice'
import {setupListeners} from '@reduxjs/toolkit/query'
import {rootReducer} from './rootReducer'
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware)
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
