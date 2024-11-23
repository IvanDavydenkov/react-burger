import { RootLayout } from '../root-layout/root-layout'
import { HomePage } from '../pages/home'
import { Route, Routes } from 'react-router-dom'
import { OrderPage } from '../pages/orders'
import { ProfilePage } from '../pages/profile'

export const App = () => {
	return (
		<>
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
					path="/profile"
					element={
						<RootLayout>
							<ProfilePage />
						</RootLayout>
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
		</>
	)
}
