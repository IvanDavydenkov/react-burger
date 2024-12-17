import cl from './style.module.css'
import { AppHeader } from '../../../widgets/app-header/app-header.tsx'
import { ReactNode } from 'react'
import { Menu } from '../../../shared/ui/menu/menu.tsx'
import { useUser } from '../../../shared/hooks/use-user.ts'
import { getCookie } from '../../../shared/lib/get-cookie.ts'
import { Navigate } from 'react-router-dom'

export const PersonalLayout = ({ children }: { children: ReactNode }) => {
	useUser()
	const isAuth = getCookie('refreshToken')

	if (!isAuth) {
		return <Navigate to="/login" replace />
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
