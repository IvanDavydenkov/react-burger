import { addPayload, ingredientsMocks } from './cart.mocks.ts'
import { cartActions, cartReducer, initialState } from './cart.slice.ts'

describe('Корзина', () => {
	it('Добавление', () => {
		const newState = cartReducer(
			initialState,
			cartActions.addItemToCart({
				...addPayload,
				orderId: addPayload._id,
				_id: '1337'
			})
		)
		expect(!!newState.items.find(item => item.orderId === addPayload._id)).toEqual(true)
	})
	it('Удаление', () => {
		const newState = cartReducer(
			{
				...initialState,
				items: [
					{
						...addPayload,
						orderId: addPayload._id,
						_id: '1337'
					}
				]
			},
			cartActions.removeItemFromCart('1337')
		)
		expect(!newState.items.find(item => item.orderId === addPayload._id)).toEqual(true)
	})
	it('Булка ', () => {
		const newState = cartReducer(initialState, cartActions.setBun(addPayload))
		expect(newState.bun).toEqual(addPayload)
	})
	it('Перетаскивание', () => {
		const newState = cartReducer(
			{
				...initialState,
				items: ingredientsMocks
			},
			cartActions.sortCart({ currentId: ingredientsMocks[4]._id, targetId: ingredientsMocks[10]._id })
		)
		const currentIndex = newState.items.findIndex(item => item._id === ingredientsMocks[4]._id)
		const targetIndex = newState.items.findIndex(item => item._id === ingredientsMocks[10]._id)

		expect(currentIndex).toEqual(10)
		expect(targetIndex).toEqual(9)
	})
})
