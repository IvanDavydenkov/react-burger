import { Portal } from '../../portal/portal.tsx'
import cl from './style.module.css'
import { ReactNode } from 'react'
import clsx from 'clsx'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	return (
		<Portal>
			<div className={clsx(cl.overlay, { [cl.overlay_open]: isOpen })} onClick={onClose}>
				<div
					className={clsx(cl.content, 'pt-10 pb-15 pl-10 pr-10')}
					onClick={e => e.stopPropagation()}
					data-cy={'modal-container'}>
					<CloseIcon type="primary" className={cl.close} onClick={onClose} />
					{children}
				</div>
			</div>
		</Portal>
	)
}
