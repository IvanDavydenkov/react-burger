import { FeedStatus } from '../../types/feed.ts'
import { initialState, userOrderReducer, userOrdersActions } from './orders.slice.ts'
import { mockOrders } from './orders.mocks.ts'

describe('Лента заказов', () => {
	it('Заказы', () => {
		const newState = userOrderReducer(initialState, userOrdersActions.onMessage(mockOrders))
		expect(newState.orders).toEqual(mockOrders.orders)
		expect(newState.totalToday).toEqual(mockOrders.totalToday)
		expect(newState.total).toEqual(mockOrders.total)
		expect(newState.success).toEqual(mockOrders.success)
	})
	it('Инициация подключения', () => {
		const newState = userOrderReducer(initialState, userOrdersActions.connect())
		expect(newState.status).toEqual(FeedStatus.Init)
	})
	it('Отключение', () => {
		const newState = userOrderReducer(initialState, userOrdersActions.onConnect())
		expect(newState.status).toEqual(FeedStatus.Connected)
	})
	it('Подключение', () => {
		const newState = userOrderReducer(initialState, userOrdersActions.disconnect())
		expect(newState.status).toEqual(FeedStatus.Disconnected)
	})
	it('Ошибка', () => {
		const newState = userOrderReducer(initialState, userOrdersActions.onError())
		expect(newState.status).toEqual(FeedStatus.Error)
	})
})
