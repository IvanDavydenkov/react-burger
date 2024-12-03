import { Ingredient } from '../types/server-response.ts'
import { createSlice } from '@reduxjs/toolkit'

export interface IngredientsSliceState {
	items: Ingredient[]
}

export const initialState: IngredientsSliceState = {
	items: []
}

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setIngredients: (state, action: { payload: Ingredient[] }) => {
			state.items = action.payload
		},
		increaseIngredientCount: (state, action: { payload: Ingredient }) => {
			return {
				...state,
				items: state.items.map(item => {
					if (item._id === action.payload._id) {
						if (!item?.count) {
							return { ...item, count: 1 }
						}
						return { ...item, count: item.count + 1 }
					}
					return item
				})
			}
		},
		decreaseIngredientCount: (state, action: { payload: Ingredient }) => {
			state.items = state.items.map(item => {
				if (item.name === action.payload.name && item.count) {
					return { ...item, count: item.count - 1 }
				}
				return item
			})
		}
	}
})

export const { reducer: ingredientsReducer, actions: ingredientsActions } = ingredientsSlice
