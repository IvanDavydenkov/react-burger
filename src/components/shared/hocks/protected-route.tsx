import { getCookie } from '../lib/get-cookie.ts'
import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const isAuth = getCookie('refreshToken')
	const location = useLocation()

	if (isAuth) {
		return <Navigate to="/" replace state={{ prev: location }} />
	}
	return <>{children}</>
}
