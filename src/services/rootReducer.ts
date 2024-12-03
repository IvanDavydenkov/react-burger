import { combineReducers } from '@reduxjs/toolkit'
import { rootApi } from './apiSlice'
import { ingredientsReducer } from './slices/ingredients.slice.ts'
import { cartReducer } from './slices/cart.slice.ts'
import { orderReducer } from './slices/order.slice.ts'
import { previewReducer } from './slices/preview.slice.ts'

export const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	ingredients: ingredientsReducer,
	cart: cartReducer,
	order: orderReducer,
	preview: previewReducer
})
