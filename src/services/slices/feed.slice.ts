import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FeedStatus, IFeed, Order, TWebSocketActions } from '../types/feed.ts'

export interface TWSResponse {
	success: boolean
	orders: Order[]
	total: number
	totalToday: number
}

export const initialState: IFeed = {
	status: FeedStatus.NotInit,
	orders: [],
	success: false,
	total: 0,
	totalToday: 0
}
const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		connect: state => {
			state.status = FeedStatus.Init
		},
		onConnect: state => {
			state.status = FeedStatus.Connected
		},
		disconnect: state => {
			state.status = FeedStatus.Disconnected
		},
		onDisconnect: state => {
			state.status = FeedStatus.NotInit
		},
		sendMessage: () => {},
		onMessage: (state, action: PayloadAction<TWSResponse>) => {
			const { success, total, totalToday, orders } = action.payload
			state.success = success
			state.total = total
			state.totalToday = totalToday
			state.orders = orders
		},
		onError: state => {
			state.status = FeedStatus.Error
		}
	}
})

export const { reducer: feedReducer, actions: feedActions } = feedSlice
export const { connect, disconnect, sendMessage, onConnect, onDisconnect, onMessage, onError } = feedActions

export const FeedActions: TWebSocketActions = {
	connect,
	disconnect,
	sendMessage,
	onConnect,
	onDisconnect,
	onMessage,
	onError
}
