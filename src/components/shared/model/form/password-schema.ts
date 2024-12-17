import { z } from 'zod'

export const passwordSchema = z
	.string({ required_error: 'Укажите пароль' })
	.trim()
	.min(5, { message: 'Необходимо минимум 5 символов' })
	.max(255, { message: 'Максимум 255 символа' })
