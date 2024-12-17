import { z } from 'zod'
import { emailCodeSchema } from '../../../shared/model/form/email-code-schema.ts'
import { passwordSchema } from '../../../shared/model/form/password-schema.ts'

export const resetPasswordSchema = z.object({
	code: emailCodeSchema,
	password: passwordSchema
})

export type SchemaResetForm = z.infer<typeof resetPasswordSchema>
