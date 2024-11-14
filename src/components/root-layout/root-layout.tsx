import {FC, ReactNode} from "react";
import {AppHeader} from "./app-header/app-header";
import cl from './style.module.css'

export const RootLayout: FC<{ children: ReactNode }> = ({children}) => {
	return (
		<div className={cl.root}>
			<AppHeader/>
			<main className={'pt-10'}>
				{children}
			</main>
		</div>
	);
};
