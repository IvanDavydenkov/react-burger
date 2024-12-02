import { rootApi } from '../apiSlice.ts'
import { Ingredient, ServerResponse } from '../types/server-response.ts'

const ingredientsApi = rootApi.injectEndpoints({
	endpoints: build => ({
		getIngredients: build.query<ServerResponse<Ingredient[]>, void>({
			query: () => ({ url: 'ingredients', method: 'GET' })
		})
	})
})

export const { useGetIngredientsQuery } = ingredientsApi
