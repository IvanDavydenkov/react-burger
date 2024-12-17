import { useActions } from '../../../services/rootActions.ts'
import { useLoginMutation, useLogoutMutation, useRegisterMutation } from '../../../services/api/auth.api.ts'
import { deleteCookie } from '../lib/delete-cookie.ts'
import { useAppSelector } from '../../../services'
import { getTokenFromResponse } from '../lib/get-token-from-response.ts'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
	const { setToken, setUser } = useActions()
	const { token } = useAppSelector(state => state.user)
	const navigate = useNavigate()
	const [register] = useRegisterMutation()
	const [login] = useLoginMutation()
	const [logout] = useLogoutMutation()

	const isAuth = token

	const authHandler = (accessToken: string, refreshToken: string) => {
		setToken(accessToken)
		document.cookie = `refreshToken=${refreshToken}; path=/; max-age=1200000`
	}

	const handleLogout = async () => {
		await logout()
		deleteCookie('refreshToken')
		setUser({ name: '', email: '' })
		return navigate('/')
	}

	const handleRegister = async (values: { email: string; password: string; name: string }) => {
		const data = await register(values)
		if (data?.data) {
			const [accessToken, refreshToken] = getTokenFromResponse(data.data)
			authHandler(accessToken, refreshToken)
			return navigate('/')
		}
		alert('Ошибка попробуйте позже')
	}

	const handleLogin = async (values: { email: string; password: string }) => {
		const data = await login(values)
		if (data?.data) {
			const [accessToken, refreshToken] = getTokenFromResponse(data.data)
			authHandler(accessToken, refreshToken)
			return navigate('/')
		}
		alert('Ошибка попробуйте позже')
	}

	return {
		handleRegister,
		handleLogin,
		handleLogout,
		isAuth: !!isAuth,
		authHandler
	}
}
