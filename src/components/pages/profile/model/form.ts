import { z } from 'zod'
import { emailSchema } from '../../../shared/model/form/email-schema.ts'
import { nameSchema } from '../../../shared/model/form/name-schema.ts'

export const profileFormSchema = z.object({
	email: emailSchema.optional(),
	password: z
		.string()
		.optional()
		.refine(password => password === undefined || password === '' || password.length >= 8, {
			message: 'Password must be at least 8 characters long'
		}),
	name: nameSchema.optional()
})

export type SchemaProfileForm = z.infer<typeof profileFormSchema>
