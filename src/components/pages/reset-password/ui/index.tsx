import cl from './style.module.css'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useResetPasswordForm } from '../hooks/use-reset-password-form.ts'
import { Controller } from 'react-hook-form'

export const ResetPasswordPage = () => {
	const location = useLocation()
	const isRedirect = location.state === 'complete'

	if (!isRedirect) {
		return <Navigate to={'/forgot-password'} state={{ uncompleted: true }} />
	}

	const { control, handleSubmit } = useResetPasswordForm()

	return (
		<form className={cl.form} onSubmit={handleSubmit}>
			<h1 className={'mb-6 text text_type_main-medium'}>Восстановление пароля</h1>
			<Controller
				control={control}
				name="code"
				render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
					//@ts-expect-error тут легаси завимость в либе
					<Input
						value={value || ''}
						name={'code'}
						onChange={onChange}
						placeholder={'Введите код из письма'}
						extraClass={'mb-6'}
						type={'text'}
						errorText={error?.message}
						error={invalid}
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
						placeholder={'Введите новый пароль'}
						errorText={error?.message}
						checkValid={() => invalid}
					/>
				)}
			/>
			<Button htmlType={'submit'} extraClass={'mb-20'}>
				Сохранить
			</Button>
			<p className={'text text_type_main-default text_color_inactive'}>
				Вспомнили пароль? <Link to={'/login'}>Войти</Link>
			</p>
		</form>
	)
}
