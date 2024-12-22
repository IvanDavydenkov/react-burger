import { z } from 'zod'

export const emailSchema = z
	.string({ required_error: 'Укажите email' })
	.email({ message: 'Некорректно введен email' })
	.trim()
	.min(5, { message: 'Необходимо минимум 5 символов' })
	.max(255, { message: 'Максимум 255 символа' })
