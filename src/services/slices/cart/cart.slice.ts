import { Ingredient } from '../../types/server-response.ts'
import { createSlice } from '@reduxjs/toolkit'

export interface IngredientsSliceState {
	bun: Ingredient | null
	items: Ingredient[]
}

export const initialState: IngredientsSliceState = {
	items: [],
	bun: null
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state, action: { payload: Ingredient }) => {
			state.items = [...state.items, { ...action.payload }]
		},
		removeItemFromCart: (state, action: { payload: string }) => {
			state.items = state.items.filter(item => item._id !== action.payload)
		},
		setBun: (state, action: { payload: Ingredient }) => {
			state.bun = { ...action.payload }
		},
		sortCart: (state, action: { payload: { currentId: string; targetId: string } }) => {
			const { payload } = action
			const { currentId, targetId } = payload
			const currentIndex = state.items.findIndex(item => item._id === currentId)
			const targetIndex = state.items.findIndex(item => item._id === targetId)
			const newState = state.items.filter(item => item._id !== currentId)
			const currentItem = state.items[currentIndex]
			state.items = [...newState.slice(0, targetIndex), currentItem, ...newState.slice(targetIndex)]
		}
	}
})

export const { reducer: cartReducer, actions: cartActions } = cartSlice
