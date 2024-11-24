import cl from './style.module.css'
import { BurgerIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

export const AppHeader = () => {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<header className={cl.header}>
			<nav className={cl.nav}>
				<ul>
					<li className={'pt-4 pr-5 pb-4 pl-5 '}>
						<Link
							className={clsx('text text_type_main-default', { ['text_color_inactive']: currentPath !== '/' })}
							to={'/'}>
							<BurgerIcon type={currentPath !== '/' ? 'secondary' : 'primary'} />
							Конструктор
						</Link>
					</li>
					<li className={'pt-4 pr-5 pb-4 pl-5'}>
						<Link
							className={clsx('text text_type_main-default', { ['text_color_inactive']: currentPath !== '/order' })}
							to={'/order'}>
							<BurgerIcon type={currentPath !== '/order' ? 'secondary' : 'primary'} />
							Лента заказов
						</Link>
					</li>
				</ul>
				<Link to={'/'}>
					<Logo />
				</Link>

				<Link
					className={clsx('text text_type_main-default', { ['text_color_inactive']: currentPath !== '/profile' })}
					to={'/profile'}>
					<ProfileIcon type={currentPath !== '/profile' ? 'secondary' : 'primary'} />
					Личный кабинет
				</Link>
			</nav>
		</header>
	)
}
