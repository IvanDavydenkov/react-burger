import { configureStore } from '@reduxjs/toolkit'
import { rootApi } from './apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rootReducer } from './rootReducer'

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware)
})

setupListeners(store.dispatch)
