import cl from './style.module.css'
import { IngredientDetails } from '../../home/ui/ingredient-details.tsx/ingredient-details.tsx'
import { useIngredients } from '../../../shared/hooks/use-ingredients.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal, useModal } from '../../../shared/ui/modal'
import { useEffect } from 'react'

export const IngredientsSlug = () => {
	const location = useLocation()
	const navigate = useNavigate()
	useIngredients()
	const handleCloseModal = () => navigate('/')

	const { isOpen, handleOpen } = useModal(handleCloseModal)
	const background = location?.state?.background

	useEffect(() => {
		handleOpen()
	}, [])

	if (background) {
		return (
			<>
				<Modal isOpen={isOpen} onClose={handleCloseModal}>
					<IngredientDetails />
				</Modal>
			</>
		)
	}
	return (
		<div className={cl.root}>
			<IngredientDetails />
		</div>
	)
}
