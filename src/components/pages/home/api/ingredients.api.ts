import { rootApi } from '../../../../store/apiSlice'
import { ServerResponse } from '../../../../store/types/server-response'
import { Ingredient } from '../data'

const ingredientsApi = rootApi.injectEndpoints({
	endpoints: build => ({
		getIngredients: build.query<ServerResponse<Ingredient[]>, void>({
			query: () => ({ url: 'ingredients', method: 'GET' })
		})
	})
})

export const { useGetIngredientsQuery } = ingredientsApi
