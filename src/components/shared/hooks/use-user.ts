import { useUserQuery } from '../../../services/api/user.api.ts'
import { useActions } from '../../../services/rootActions.ts'
import { useEffect } from 'react'
import { useAuth } from './use-auth.ts'
import { useRefreshTokenMutation } from '../../../services/api/auth.api.ts'
import { getTokenFromResponse } from '../lib/get-token-from-response.ts'
import { getCookie } from '../lib/get-cookie.ts'
import { useAppSelector } from '../../../services'
import { deleteCookie } from '../lib/delete-cookie.ts'
import { useLocation, useNavigate } from 'react-router-dom'

export const useUser = () => {
	const { authHandler } = useAuth()
	const user = useAppSelector(state => state.user.user)
	const token = useAppSelector(state => state.user.token)
	const location = useLocation()
	const navigate = useNavigate()
	const { setUser } = useActions()
	const { data } = useUserQuery(undefined, { skip: !token || !!user })

	const [refresh] = useRefreshTokenMutation()

	const REFRESH_TOKEN = getCookie('refreshToken')

	const handleRefreshToken = async () => {
		try {
			const res = await refresh()

			if (res?.data) {
				const [accessToken, refreshToken] = getTokenFromResponse(res.data)
				authHandler(accessToken, refreshToken)
				return
			}
			throw new Error('refresh token error')
		} catch (error) {
			deleteCookie('refreshToken')
			navigate('/login', { state: { prev: location } })
		}
	}

	useEffect(() => {
		if (REFRESH_TOKEN && !token) handleRefreshToken()
	}, [])

	useEffect(() => {
		if (data) setUser(data.user)
	}, [data])
}
