import { useCallback, useEffect, useState } from 'react'

export const useModal = (onClose = () => {}) => {
	const [isOpen, setIsOpen] = useState(false)
	const handleClose = () => setIsOpen(false)
	const handleOpen = () => setIsOpen(true)

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose()
				onClose?.()
			}
		},
		[handleClose]
	)

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
			document.body.style.overflow = 'hidden'
		}

		if (document) {
			document.body.style.overflow = isOpen ? 'hidden' : 'unset'
		}

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	return { handleClose, handleOpen, isOpen }
}
