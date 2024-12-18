import { createSlice } from '@reduxjs/toolkit'

interface TUser {
	user: {
		name: string
		email: string
	} | null
	token: string | null
}

const initialState: TUser = {
	user: null,
	token: null
}

const userSlice = createSlice({
	initialState,
	name: 'user',
	reducers: {
		setUser: (state, action: { payload: { name: string; email: string } }) => {
			state.user = action.payload
		},
		setToken: (state, action: { payload: string }) => {
			state.token = action.payload
		}
	}
})

export const { reducer: userReducer, actions: userActions } = userSlice
