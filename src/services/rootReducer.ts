import { combineReducers } from '@reduxjs/toolkit'
import { rootApi } from './apiSlice'
import { ingredientsReducer } from './slices/ingredients/ingredients.slice.ts'
import { cartReducer } from './slices/cart/cart.slice.ts'
import { orderReducer } from './slices/order/order.slice.ts'
import { userReducer } from './slices/user/user.slice.ts'
import { feedReducer } from './slices/feed/feed.slice.ts'
import { userOrderReducer } from './slices/orders/orders.slice.ts'

export const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	ingredients: ingredientsReducer,
	cart: cartReducer,
	order: orderReducer,
	user: userReducer,
	feed: feedReducer,
	userOrder: userOrderReducer
})
