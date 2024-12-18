import { rootApi } from '../apiSlice.ts'

export interface UserInfo {
	email?: string
	name?: string
	password?: string
}

export interface UserResponse {
	success: boolean
	user: { email: string; name: string }
}

const userApi = rootApi.injectEndpoints({
	endpoints: build => ({
		user: build.query<UserResponse, void>({
			query: () => ({
				url: 'auth/user',
				method: 'GET'
			})
		}),
		changeUserInfo: build.mutation<UserResponse, UserInfo>({
			query: data => ({
				url: 'auth/user',
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
		})
	})
})

export const { useUserQuery, useChangeUserInfoMutation } = userApi
