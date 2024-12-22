import { useModal } from '../../../shared/ui/modal'

export const useIngredientModal = () => {
	const { isOpen, handleOpen, handleClose } = useModal()

	return {
		isOpen,
		handleClose,
		handleOpen
	}
}
