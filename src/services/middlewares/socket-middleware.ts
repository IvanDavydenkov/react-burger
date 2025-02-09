import type { Middleware } from 'redux'
import { TWebSocketActions } from '../types/feed.ts'

export const socketMiddleware = (url: string, actions: TWebSocketActions, withToken = false): Middleware => {
	return store => {
		let socket: WebSocket | null = null
		const { connect, onConnect, onDisconnect, disconnect, onMessage, sendMessage, onError } = actions

		return next => action => {
			const { dispatch } = store

			if (connect.match(action)) {
				if (!socket || socket.readyState === WebSocket.CLOSED) {
					if (withToken) {
						const accessToken = store.getState().user.token
						socket = new WebSocket(url + `?token=${accessToken}`)
					}
					if (!withToken) {
						socket = new WebSocket(url)
					}
					if (!socket) return
					dispatch(connect())
					socket.onopen = () => {
						dispatch(onConnect())
					}
					socket.onerror = () => {
						dispatch(onError())
					}
					socket.onmessage = event => {
						const { data } = event
						const parsedData = JSON.parse(data)
						dispatch(onMessage(parsedData))
					}
					socket.onclose = () => {
						dispatch(onDisconnect())
					}
				}
			}
			if (socket && sendMessage.match(action)) {
				socket.send(JSON.stringify(action.payload))
			}
			if (socket && disconnect.match(action)) {
				socket.close()
				socket = null
			}
			next(action)
		}
	}
}
