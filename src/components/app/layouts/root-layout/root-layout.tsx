import { FC, ReactNode } from 'react'
import { AppHeader } from '../../../widgets/app-header/app-header.tsx'
import cl from './style.module.css'

export const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={cl.root}>
			<AppHeader />
			<main>{children}</main>
		</div>
	)
}
