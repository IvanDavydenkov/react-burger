import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './index.ts'

export const rootApi = createApi({
	reducerPath: 'rootApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://norma.nomoreparties.space/api/',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).user.token
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
		// responseHandler: response => {
		// 	// if(response.status == 403) {
		// 	//	TODO: понять как перехватывать 403 и 401 ошибки, чтобы рефрешить тут токен
		// 	// }
		// 	return response
		// }
	}),
	refetchOnFocus: true,
	endpoints: () => ({})
})
