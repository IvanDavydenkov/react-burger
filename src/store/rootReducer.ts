import { combineReducers } from '@reduxjs/toolkit'
import { rootApi } from './apiSlice'

export const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer
})
