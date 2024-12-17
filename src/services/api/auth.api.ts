import { rootApi } from '../apiSlice.ts'
import { getCookie } from '../../components/shared/lib/get-cookie.ts'

export interface loginProps {}

export interface loginResponse {
	success: boolean
	user: {
		email: string
		name: string
	}
	accessToken: string
	refreshToken: string
}

export interface registerProps {
	email?: string
	password?: string
	name?: string
}

export interface registerResponse {
	success: boolean
	user: {
		email: string
		name: string
	}
	accessToken: string
	refreshToken: string
}

export interface RefreshTokenResponse {
	success: boolean
	accessToken: string
	refreshToken: string
}

const authApi = rootApi.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<registerResponse, loginProps>({
			query: body => ({
				url: 'auth/login',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
		}),
		register: build.mutation<registerResponse, registerProps>({
			query: body => ({
				url: 'auth/register',
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(body)
			})
		}),
		logout: build.mutation<unknown, void>({
			query: () => ({
				headers: { 'Content-Type': 'application/json' },
				url: 'auth/logout',
				method: 'POST',
				body: JSON.stringify({ token: getCookie('refreshToken') })
			})
		}),
		refreshToken: build.mutation<RefreshTokenResponse, void>({
			query: () => ({
				headers: { 'Content-Type': 'application/json' },
				url: 'auth/token',
				method: 'POST',
				body: JSON.stringify({ token: getCookie('refreshToken') })
			})
		})
	})
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshTokenMutation } = authApi
