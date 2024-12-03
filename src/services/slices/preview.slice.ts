import { Ingredient } from '../types/server-response.ts'
import { createSlice } from '@reduxjs/toolkit'

interface PreviewSliceState {
	preview: Ingredient | null
}

export const initialState: PreviewSliceState = {
	preview: null
}

const previewSlice = createSlice({
	name: 'preview',
	initialState,
	reducers: {
		setPreview: (state, action: { payload: Ingredient }) => {
			if (action.payload) {
				return {
					...state,
					preview: action.payload
				}
			}
			return state
		},
		resetPreview: state => {
			state = initialState
			return state
		}
	}
})

export const { reducer: previewReducer, actions: previewActions } = previewSlice
