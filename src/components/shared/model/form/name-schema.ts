import { z } from 'zod'

export const nameSchema = z
	.string({ required_error: 'Укажите имя' })
	.trim()
	.min(2, { message: 'Необходимо минимум 2 символа' })
	.max(255, { message: 'Максимум 255 символа' })
