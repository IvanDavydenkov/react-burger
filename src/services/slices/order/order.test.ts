import { initialState, orderActions, orderReducer } from './order.slice.ts'

const mockOrder = {
	order: 1
}

describe('Слой заказа', () => {
	it('Заказ', () => {
		const newState = orderReducer(initialState, orderActions.setOrder(mockOrder))
		expect(newState).toEqual(mockOrder)
	})
})
