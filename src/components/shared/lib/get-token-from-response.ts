export const getTokenFromResponse = (data: { accessToken: string; refreshToken: string }) => {
	const accessToken = data.accessToken.split(' ')[1]
	const refreshToken = data.refreshToken

	return [accessToken, refreshToken]
}
