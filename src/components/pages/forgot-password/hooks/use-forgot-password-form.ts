import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, SchemaForgotForm } from '../model/form.ts'
import { useNavigate } from 'react-router-dom'

export const useForgotPasswordForm = () => {
	const navigate = useNavigate()

	const { control, handleSubmit } = useForm<SchemaForgotForm>({
		mode: 'onSubmit',
		resolver: zodResolver(forgotPasswordSchema)
	})
	const onSubmit: SubmitHandler<Required<SchemaForgotForm>> = data => {
		console.log(data) // Пока ничего не делает
		navigate('/reset-password', { state: 'complete' })
	}

	return {
		control,
		handleSubmit: handleSubmit(onSubmit)
	}
}
