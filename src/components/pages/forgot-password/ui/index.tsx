import cl from './style.module.css'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form.ts'
import { Controller } from 'react-hook-form'

export const ForgotPasswordPage = () => {
	const location = useLocation()
	const isRedirect = location?.state?.uncompleted

	const { control, handleSubmit } = useForgotPasswordForm()

	return (
		<form className={cl.form} onSubmit={handleSubmit}>
			<h1 className={'mb-6 text text_type_main-medium'}>Восстановление пароля</h1>
			{isRedirect && (
				<p className={'text text_type_main-default text_color_inactive mb-4'}>
					Для восстановления нужно сперва отправить письмо на вашу почту
				</p>
			)}
			<Controller
				control={control}
				name="email"
				render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
					<EmailInput
						value={value || ''}
						name={'email'}
						onChange={onChange}
						extraClass={'mb-6'}
						placeholder={'Укажите e-mail'}
						errorText={error?.message}
						checkValid={() => invalid}
					/>
				)}
			/>

			<Button htmlType={'submit'} extraClass={'mb-20'}>
				Восстановление пароля
			</Button>
			<p className={'text text_type_main-default text_color_inactive'}>
				Вспомнили пароль? <Link to={'/login'}>Войти</Link>
			</p>
		</form>
	)
}
