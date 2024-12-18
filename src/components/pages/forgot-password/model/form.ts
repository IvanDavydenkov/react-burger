import { z } from 'zod'
import { emailSchema } from '../../../shared/model/form/email-schema.ts'

export const forgotPasswordSchema = z.object({
	email: emailSchema
})

export type SchemaForgotForm = z.infer<typeof forgotPasswordSchema>
