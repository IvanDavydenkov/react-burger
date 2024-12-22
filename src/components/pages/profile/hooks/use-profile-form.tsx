import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileFormSchema, SchemaProfileForm } from '../model/form.ts'
import { useChangeUserInfoMutation } from '../../../../services/api/user.api.ts'
import { useAppSelector } from '../../../../services'
import { useEffect } from 'react'
import { useActions } from '../../../../services/rootActions.ts'

export const useProfileForm = () => {
	const [updateInfo] = useChangeUserInfoMutation()
	const { setUser } = useActions()
	const user = useAppSelector(state => state.user.user)

	const { control, handleSubmit, setValue, watch } = useForm<SchemaProfileForm>({
		mode: 'onSubmit',
		resolver: zodResolver(profileFormSchema)
	})
	const isChange = !(watch('name') === user?.name && watch('email') === user?.email && watch('password') === '')

	const onSubmit: SubmitHandler<Required<SchemaProfileForm>> = async data => {
		try {
			const res = await updateInfo(data)
			if (res.data) setUser(res.data.user)
		} catch (err) {
			alert('Попробуйте позже')
		}
	}

	const resetForm = () => {
		if (user) {
			setValue('name', user?.name)
			setValue('email', user?.email)
			setValue('password', '')
		}
	}
	useEffect(() => {
		resetForm()
	}, [user])
	return {
		control,
		// @ts-ignore
		handleSubmit: handleSubmit(onSubmit),
		resetForm,
		isChange
	}
}
