import { z } from 'zod'
import { emailSchema } from '../../../shared/model/form/email-schema.ts'
import { passwordSchema } from '../../../shared/model/form/password-schema.ts'
import { nameSchema } from '../../../shared/model/form/name-schema.ts'

export const registerFormSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
	name: nameSchema
})

export type SchemaRegisterForm = z.infer<typeof registerFormSchema>
