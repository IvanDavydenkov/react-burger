import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
	reducerPath: 'rootApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://norma.nomoreparties.space/api/'
		// prepareHeaders: (headers, { getState }) => {
		// Здесь позже пихну логику авторизации, когда доживем
		// 	return headers
		// }
	}),
	refetchOnFocus: true,
	endpoints: () => ({})
})
