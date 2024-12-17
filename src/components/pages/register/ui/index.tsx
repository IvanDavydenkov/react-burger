import cl from './style.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useRegisterForm } from '../hooks/use-register-form.tsx'
import { Controller } from 'react-hook-form'

export const RegisterPage = () => {
	const { control, handleSubmit } = useRegisterForm()
	return (
		<form className={cl.form} onSubmit={handleSubmit} noValidate={true}>
			<h1 className={'mb-6 text text_type_main-medium'}>Регистрация</h1>
			<Controller
				control={control}
				name="name"
				render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
					<Input
						value={value}
						name={'name'}
						onChange={onChange}
						placeholder={'Имя'}
						extraClass={'mb-6'}
						type={'text'}
						onPointerEnterCapture={null}
						onPointerLeaveCapture={null}
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
						value={value}
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
						value={value}
						name={'password'}
						onChange={onChange}
						extraClass={'mb-6'}
						errorText={error?.message}
						checkValid={() => invalid}
					/>
				)}
			/>
			<Button htmlType={'submit'} extraClass={'mb-20'}>
				Зарегистрироваться
			</Button>
			<p className={'text text_type_main-default text_color_inactive'}>
				Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
			</p>
		</form>
	)
}
