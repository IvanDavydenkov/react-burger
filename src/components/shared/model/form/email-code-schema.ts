import { z } from 'zod'

export const emailCodeSchema = z
	.string({ required_error: 'Укажите код с почты' })
	.trim()
	.min(5, { message: 'Необходимо минимум 5 символов' })
	.max(255, { message: 'Максимум 255 символа' })
