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

export const enum ProductType {
	Bun = 'bun',
	Sauce = 'sauce',
	Main = 'main'
}

export interface Ingredient {
	_id: string
	name: string
	type: ProductType
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile: string
	image_large: string
	__v: number
	count?: number
	orderId: string
}

export interface OrderData {
	name: string
	order: {
		number: number
	}
	success: boolean
}
