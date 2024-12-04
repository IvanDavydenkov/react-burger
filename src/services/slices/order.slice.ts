import { createSlice } from '@reduxjs/toolkit'

export const initialState: { order: number | null } = {
	order: null
}
const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action: { payload: { order: number | null } }) => {
			state.order = action.payload.order
		}
	}
})

export const { reducer: orderReducer, actions: orderActions } = orderSlice
