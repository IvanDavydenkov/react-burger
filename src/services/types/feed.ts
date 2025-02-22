import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { Message } from '../slices/feed/feed.slice.ts'

export interface Order {
	_id: string
	ingredients: string[]
	status: 'done' | 'pending' | 'created'
	name: string
	createdAt: string
	updatedAt: string
	number: number
}

export enum FeedStatus {
	Init = 'init',
	NotInit = 'not init',
	Connected = 'connected',
	Disconnected = 'disconnected',
	Error = 'error'
}

export interface IFeed {
	success: boolean
	orders: Order[]
	total: number
	totalToday: number
	status: FeedStatus
}

export type TWebSocketActions = {
	connect: ActionCreatorWithoutPayload
	disconnect: ActionCreatorWithoutPayload
	sendMessage: ActionCreatorWithoutPayload
	onConnect: ActionCreatorWithoutPayload
	onDisconnect: ActionCreatorWithoutPayload
	onMessage: ActionCreatorWithPayload<Message>
	onError: ActionCreatorWithoutPayload
}
