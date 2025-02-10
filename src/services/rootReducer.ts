import { combineReducers } from '@reduxjs/toolkit'
import { rootApi } from './apiSlice'
import { ingredientsReducer } from './slices/ingredients.slice.ts'
import { cartReducer } from './slices/cart.slice.ts'
import { orderReducer } from './slices/order.slice.ts'
import { userReducer } from './slices/user.slice.ts'
import { feedReducer } from './slices/feed.slice.ts'
import { userOrderReducer } from './slices/orders.slice.ts'

export const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	ingredients: ingredientsReducer,
	cart: cartReducer,
	order: orderReducer,
	user: userReducer,
	feed: feedReducer,
	userOrder: userOrderReducer
})
