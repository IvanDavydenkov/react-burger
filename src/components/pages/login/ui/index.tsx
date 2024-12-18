import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import cl from './style.module.css'
import { Link } from 'react-router-dom'
import { useLoginForm } from '../hooks/use-login-form.tsx'
import { Controller } from 'react-hook-form'

export const LoginPage = () => {
	const { handleSubmit, control } = useLoginForm()

	return (
		<form className={cl.form} onSubmit={handleSubmit} noValidate={true}>
			<h1 className={'mb-6 text text_type_main-medium'}>Вход</h1>
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

			<Button htmlType={'submit'} extraClass={'mb-20'}>
				Войти
			</Button>
			<p className={'text text_type_main-default text_color_inactive'}>
				Вы — новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
			</p>
			<p className={'text text_type_main-default text_color_inactive'}>
				Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
			</p>
		</form>
	)
}
