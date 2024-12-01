export interface ServerResponse<T> {
	status: 'success' | 'error'
	data: T
	errors?: ServerError[]
	code: number
}

export interface ServerError {
	message: string
	code: number
	customData: unknown
}
