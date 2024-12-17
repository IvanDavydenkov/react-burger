import { z } from 'zod'
import { emailSchema } from '../../../shared/model/form/email-schema.ts'
import { passwordSchema } from '../../../shared/model/form/password-schema.ts'

export const loginFormSchema = z.object({
	email: emailSchema,
	password: passwordSchema
})

export type SchemaLoginForm = z.infer<typeof loginFormSchema>
