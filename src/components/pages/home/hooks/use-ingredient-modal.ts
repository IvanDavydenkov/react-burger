import { useModal } from '../../../modal'
import { Ingredient } from '../../../../services/types/server-response.ts'
import { useActions } from '../../../../services/rootActions.ts'

export const useIngredientModal = () => {
	const actions = useActions()
	const { isOpen, handleOpen, handleClose } = useModal()
	const handleSetActiveIngredient = (item: Ingredient) => {
		if (!item) return
		actions.setPreview(item)
		handleOpen()
	}
	return {
		isOpen,
		handleClose,
		handleOpen,
		handleSetActiveIngredient
	}
}
