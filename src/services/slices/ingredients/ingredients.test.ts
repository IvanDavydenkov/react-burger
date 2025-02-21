import { ingredientsActions, ingredientsReducer, initialState } from './ingredients.slice.ts'
import { ingredientsMocks } from './ingredients.mocks.ts'

const ingredientWithCountMock = ingredientsMocks[0]
const ingredientWithoutCountMock = ingredientsMocks[1]
describe('Слой интгредиентов', () => {
	it('Интгредиенты', () => {
		const newState = ingredientsReducer(initialState, ingredientsActions.setIngredients(ingredientsMocks))
		expect(newState.items).toEqual(ingredientsMocks)
	})
	it('Добавление без кол-ва', () => {
		const newState = ingredientsReducer(
			{ items: ingredientsMocks },
			ingredientsActions.increaseIngredientCount(ingredientWithoutCountMock)
		)

		expect(newState.items.find(item => item._id === ingredientWithoutCountMock._id)?.count).toEqual(1)
	})
	it('Добавление с кол-вом', () => {
		const newState = ingredientsReducer(
			{ items: ingredientsMocks },
			ingredientsActions.increaseIngredientCount(ingredientWithCountMock)
		)
		const prevState = ingredientsMocks.find(item => item._id === ingredientWithCountMock._id)
		const nextState = newState.items.find(item => item._id === ingredientWithCountMock._id)

		if (!prevState?.count) throw new Error('неожиданность1')
		if (!nextState?.count) throw new Error('неожиданность2')

		expect(nextState?.count).toEqual(prevState?.count + 1)
	})
	it('Удаление без кол-ва', () => {
		const newState = ingredientsReducer(
			{ items: ingredientsMocks },
			ingredientsActions.decreaseIngredientCount(ingredientWithoutCountMock)
		)

		// в теории может быть и ноль и андефайнд, а это в буле 0
		expect(!!newState.items.find(item => item._id === ingredientWithoutCountMock._id)?.count).toEqual(false)
	})

	it('Удаление с кол-вом', () => {
		const newState = ingredientsReducer(
			{ items: ingredientsMocks },
			ingredientsActions.decreaseIngredientCount(ingredientWithCountMock)
		)
		const prevState = ingredientsMocks.find(item => item._id === ingredientWithCountMock._id)
		const nextState = newState.items.find(item => item._id === ingredientWithCountMock._id)

		if (!prevState?.count) throw new Error('неожиданность1')
		if (!nextState?.count) throw new Error('неожиданность2')

		expect(nextState?.count).toEqual(prevState?.count - 1)
	})
})
