import { getCookie } from './get-cookie.ts'
import { getTokenFromResponse } from './get-token-from-response.ts'

interface Response {
	success: boolean
	accessToken: string
	refreshToken: string
}

export const refreshToken = async () => {
	// const { setToken } = useActions()
	const res: Response = await fetch('https://norma.nomoreparties.space/api/auth/token', {
		headers: { Accept: 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			token: getCookie('refreshToken')
		})
	}).then(response => response.json())

	if (res.success) {
		const [_, refreshToken] = getTokenFromResponse(res)

		document.cookie = `refreshToken=${refreshToken}; path=/; max-age=1200000`
		// setToken(accessToken)
		return true
	}
	return false
}
