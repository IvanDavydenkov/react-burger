import { useUser } from '../hooks/use-user.ts'
import { getCookie } from '../lib/get-cookie.ts'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	useUser()
	const isAuth = getCookie('refreshToken')

	if (isAuth) {
		return <Navigate to="/" replace />
	}
	return <>{children}</>
}
