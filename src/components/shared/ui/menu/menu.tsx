import cl from './style.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { menuItems } from './data.ts'
import clsx from 'clsx'
import { useAuth } from '../../hooks/use-auth.ts'

export interface MenuProps {
	list?: { label: string; link: string }[]
}

export const Menu = (props: MenuProps) => {
	const { list = menuItems } = props
	const location = useLocation()
	const { handleLogout } = useAuth()
	return (
		<nav className={cl.menu}>
			<ul>
				{list.map(item => {
					const isActive = item.link === location.pathname // Обычный isActive из колбека внутри класса неправильно сравнивает, он проверяет на наличие, а не соответствие
					return (
						<li key={item.link}>
							<NavLink
								to={item.link}
								className={clsx('text text_type_main-medium', { ['text_color_inactive']: !isActive })}>
								{item.label}{' '}
							</NavLink>
						</li>
					)
				})}
				<li>
					<Button
						htmlType={'button'}
						type={'secondary'}
						extraClass={'text text_type_main-medium'}
						onClick={handleLogout}>
						Выход
					</Button>
				</li>
			</ul>
		</nav>
	)
}
