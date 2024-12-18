import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, SchemaRegisterForm } from '../model/form.ts'
import { useAuth } from '../../../shared/hooks/use-auth.ts'

export const useRegisterForm = () => {
	const { handleRegister } = useAuth()

	const { control, handleSubmit } = useForm<SchemaRegisterForm>({
		mode: 'onSubmit',
		resolver: zodResolver(registerFormSchema)
	})

	const onSubmit: SubmitHandler<Required<SchemaRegisterForm>> = async data => {
		await handleRegister(data)
	}

	return {
		control,
		handleSubmit: handleSubmit(onSubmit)
	}
}
