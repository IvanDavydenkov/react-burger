import { Ingredient } from '../data'
import { useModal } from '../../../modal'
import { useState } from 'react'

export const useIngredientModal = (items: Ingredient[]) => {
	const [activeIngredient, setActiveIngredient] = useState<Ingredient>(items[0])

	const { isOpen, handleOpen, handleClose } = useModal()
	const handleSetActiveIngredient = (id: string) => {
		const item = items.find(item => item._id === id)
		if (!item) return
		setActiveIngredient(item)
		handleOpen()
	}
	return {
		isOpen,
		handleClose,
		handleOpen,
		handleSetActiveIngredient,
		activeIngredient
	}
}
