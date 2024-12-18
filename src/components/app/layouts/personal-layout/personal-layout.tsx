import cl from './style.module.css'
import { AppHeader } from '../../../widgets/app-header/app-header.tsx'
import { ReactNode } from 'react'
import { Menu } from '../../../shared/ui/menu/menu.tsx'
import { getCookie } from '../../../shared/lib/get-cookie.ts'
import { Navigate, useLocation } from 'react-router-dom'

export const PersonalLayout = ({ children }: { children: ReactNode }) => {
	const isAuth = getCookie('refreshToken')
	const location = useLocation()

	if (!isAuth) {
		return <Navigate to="/login" replace state={{ prev: location }} />
	}

	return (
		<div className={cl.root}>
			<AppHeader />
			<main>
				<Menu />
				{children}
			</main>
		</div>
	)
}
