import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useProfileForm } from '../hooks/use-profile-form.tsx'
import { Controller } from 'react-hook-form'

export const ProfilePage = () => {
	const { handleSubmit, control, resetForm, isChange } = useProfileForm()

	const onCancle = () => {
		resetForm()
	}
	return (
		<form onSubmit={handleSubmit}>
			<Controller
				control={control}
				name="name"
				render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
					//@ts-expect-error тут легаси завимость в либе
					<Input
						value={value || ''}
						name={'name'}
						onChange={onChange}
						placeholder={'Имя'}
						extraClass={'mb-6'}
						type={'text'}
						errorText={error?.message}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="email"
				render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
					<EmailInput
						value={value || ''}
						name={'email'}
						onChange={onChange}
						extraClass={'mb-6'}
						errorText={error?.message}
						checkValid={() => invalid}
						placeholder={'Логин'}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
					<PasswordInput
						value={value || ''}
						name={'password'}
						onChange={onChange}
						extraClass={'mb-6'}
						errorText={error?.message}
						checkValid={() => invalid}
					/>
				)}
			/>
			{isChange && (
				<>
					<Button htmlType={'submit'}>Сохранить</Button>
					<Button htmlType={'button'} onClick={onCancle}>
						Отменить
					</Button>
				</>
			)}
		</form>
	)
}
