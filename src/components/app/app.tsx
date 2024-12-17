import { RootLayout } from './layouts/root-layout/root-layout'
import { HomePage } from '../pages/home'
import { Route, Routes } from 'react-router-dom'
import { OrderPage } from '../pages/orders'
import { ProfilePage } from '../pages/profile'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register'
import { ForgotPasswordPage } from '../pages/forgot-password'
import { ResetPasswordPage } from '../pages/reset-password'
import { PersonalLayout } from './layouts/personal-layout/personal-layout.tsx'
import { IngredientsSlug } from '../pages/ingredients-slug/ui'
import { ProtectedRoute } from '../shared/hocks/protected-route.tsx'

export const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<RootLayout>
						<HomePage />
					</RootLayout>
				}
			/>
			<Route
				path="/order"
				element={
					<RootLayout>
						<OrderPage />
					</RootLayout>
				}
			/>
			<Route
				path={'/ingredients/:id'}
				element={
					<RootLayout>
						<IngredientsSlug />
					</RootLayout>
				}
			/>
			<Route
				path="/profile"
				element={
					<PersonalLayout>
						<ProfilePage />
					</PersonalLayout>
				}
			/>
			<Route
				path="/profile/orders"
				element={
					<PersonalLayout>
						<OrderPage />
					</PersonalLayout>
				}
			/>
			<Route
				path="/login"
				element={
					<ProtectedRoute>
						<RootLayout>
							<LoginPage />
						</RootLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/register"
				element={
					<ProtectedRoute>
						<RootLayout>
							<RegisterPage />
						</RootLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/forgot-password"
				element={
					<ProtectedRoute>
						<RootLayout>
							<ForgotPasswordPage />
						</RootLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/reset-password"
				element={
					<ProtectedRoute>
						<RootLayout>
							<ResetPasswordPage />
						</RootLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="*"
				element={
					<RootLayout>
						<h1>404 Page Not Found</h1>
					</RootLayout>
				}
			/>
		</Routes>
	)
}
