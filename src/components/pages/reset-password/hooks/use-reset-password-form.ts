import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useNavigate } from 'react-router-dom'
import { resetPasswordSchema, SchemaResetForm } from '../model/form.ts'

export const useResetPasswordForm = () => {
	const navigate = useNavigate()

	const { control, handleSubmit } = useForm<SchemaResetForm>({
		mode: 'onSubmit',
		resolver: zodResolver(resetPasswordSchema)
	})
	const onSubmit: SubmitHandler<Required<SchemaResetForm>> = data => {
		console.log(data) // Пока ничего не делает
		navigate('/login')
	}

	return {
		control,
		handleSubmit: handleSubmit(onSubmit)
	}
}
