import { getCookie } from './get-cookie.ts'
import { getTokenFromResponse } from './get-token-from-response.ts'
import { BASE_URL } from './consts.ts'
import { deleteCookie } from './delete-cookie.ts'

interface Response {
	status: any
	success: boolean
	accessToken: string
	refreshToken: string
}

export const refreshToken = async () => {
	const res: Response = await fetch(`${BASE_URL}auth/token`, {
		headers: { Accept: 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			token: getCookie('refreshToken')
		})
	})
		.then(response => {
			if (res.success) {
				return response.json()
			}
			return Promise.reject(`Ошибка ${res.status}`)
		})
		.catch(err => {
			return alert(err)
		})

	if (res.success) {
		const [_, refreshToken] = getTokenFromResponse(res)

		document.cookie = `refreshToken=${refreshToken}; path=/; max-age=1200000`

		return
	} else {
		deleteCookie('refreshToken')
	}
}
