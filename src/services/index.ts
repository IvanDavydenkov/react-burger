import { configureStore } from '@reduxjs/toolkit'
import { rootApi } from './apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rootReducer } from './rootReducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { socketMiddleware } from './middlewares/socket-middleware.ts'
import { FeedActions } from './slices/feed.slice.ts'
import { OrderActions } from './slices/orders.slice.ts'

const wsUrl = 'wss://norma.nomoreparties.space/orders/all'
const personalOrdersWS = 'wss://norma.nomoreparties.space/orders'
export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(rootApi.middleware)
			.concat(socketMiddleware(wsUrl, FeedActions))
			.concat(socketMiddleware(personalOrdersWS, OrderActions, true))
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
