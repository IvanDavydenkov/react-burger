// Тестовые данные
import { initialState, userActions, userReducer } from './user.slice.ts'
import { mockToken, mockUser } from './user.mocks.ts'

describe('Слой пользователя', () => {
	it('Пользователь', () => {
		const newState = userReducer(initialState, userActions.setUser(mockUser))

		expect(newState.user).toEqual(mockUser)
		expect(newState.token).toBeNull()
	})
	it('Токен', () => {
		const newState = userReducer(initialState, userActions.setToken(mockToken))

		expect(newState.token).toEqual(mockToken)
		expect(newState.user).toBeNull()
	})
})
