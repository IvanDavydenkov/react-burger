import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, SchemaLoginForm } from '../model/form.ts'
import { useAuth } from '../../../shared/hooks/use-auth.ts'

export const useLoginForm = () => {
	const { handleLogin } = useAuth()

	const { control, handleSubmit } = useForm<SchemaLoginForm>({
		mode: 'onSubmit',
		resolver: zodResolver(loginFormSchema)
	})
	const onSubmit: SubmitHandler<Required<SchemaLoginForm>> = async data => {
		await handleLogin(data)
	}

	return {
		control,
		handleSubmit: handleSubmit(onSubmit)
	}
}
