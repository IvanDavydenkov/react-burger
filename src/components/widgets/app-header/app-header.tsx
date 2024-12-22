import cl from './style.module.css'
import { BurgerIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'
import { NavLink, useLocation } from 'react-router-dom'

export const AppHeader = () => {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<header className={clsx(cl.header, 'mb-10')}>
			<nav className={cl.nav}>
				<ul>
					<li className={'pt-4 pr-5 pb-4 pl-5 '}>
						<NavLink
							className={({ isActive }) => clsx('text text_type_main-default', { ['text_color_inactive']: !isActive })}
							to={'/'}>
							<BurgerIcon type={currentPath !== '/' ? 'secondary' : 'primary'} />
							Конструктор
						</NavLink>
					</li>
					<li className={'pt-4 pr-5 pb-4 pl-5'}>
						<NavLink
							className={({ isActive }) => clsx('text text_type_main-default', { ['text_color_inactive']: !isActive })}
							to={'/order'}>
							<BurgerIcon type={currentPath !== '/order' ? 'secondary' : 'primary'} />
							Лента заказов
						</NavLink>
					</li>
				</ul>
				<NavLink to={'/'}>
					<Logo />
				</NavLink>

				<NavLink
					className={({ isActive }) => clsx('text text_type_main-default', { ['text_color_inactive']: !isActive })}
					to={'/profile'}>
					<ProfileIcon type={currentPath.split('/').includes('profile') ? 'primary' : 'secondary'} />
					Личный кабинет
				</NavLink>
			</nav>
		</header>
	)
}
