import { createPortal } from 'react-dom'
import { ReactNode } from 'react'

export interface PortalProps {
	children: ReactNode
}

export const Portal = ({ children }: PortalProps) => {
	return <div>{createPortal(children, document.querySelector('#modals') ?? document.body)}</div>
}
