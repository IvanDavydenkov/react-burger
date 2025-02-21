import { FeedStatus } from '../../types/feed.ts'
import { feedActions, feedReducer, initialState } from './feed.slice.ts'
import { feedMocks } from './feed.mocks.ts'

describe('Лента заказов', () => {
	it('Заказы', () => {
		const newState = feedReducer(initialState, feedActions.onMessage(feedMocks))
		expect(newState.orders).toEqual(feedMocks.orders)
		expect(newState.totalToday).toEqual(feedMocks.totalToday)
		expect(newState.total).toEqual(feedMocks.total)
		expect(newState.success).toEqual(feedMocks.success)
	})
	it('Инициация подключения', () => {
		const newState = feedReducer(initialState, feedActions.connect())
		expect(newState.status).toEqual(FeedStatus.Init)
	})
	it('Отключение', () => {
		const newState = feedReducer(initialState, feedActions.onConnect())
		expect(newState.status).toEqual(FeedStatus.Connected)
	})
	it('Подключение', () => {
		const newState = feedReducer(initialState, feedActions.disconnect())
		expect(newState.status).toEqual(FeedStatus.Disconnected)
	})
	it('Ошибка', () => {
		const newState = feedReducer(initialState, feedActions.onError())
		expect(newState.status).toEqual(FeedStatus.Error)
	})
})
