import { rootApi } from '../apiSlice.ts'
import { OrderData } from '../types/server-response.ts'

const orderApi = rootApi.injectEndpoints({
	endpoints: build => ({
		sendOrder: build.mutation<OrderData, { ingredients: string[] }>({
			query: data => ({
				url: 'orders',
				method: 'POST',
				body: data,
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			})
		})
	})
})

export const { useSendOrderMutation } = orderApi
