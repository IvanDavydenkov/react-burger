import cl from './style.module.css'
import { IngredientDetails } from '../../home/ui/ingredient-details.tsx/ingredient-details.tsx'
import { useIngredients } from '../../../shared/hooks/use-ingredients.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomePage } from '../../home'
import { Modal } from '../../../shared/ui/modal'
import { useEffect, useState } from 'react'

export const IngredientsSlug = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false) // чтобы анимация плавная была у открытия модалки
	useIngredients()

	const background = location?.state?.background

	const handleCloseModal = () => navigate('/')

	useEffect(() => {
		setIsOpen(true)
	}, [])

	if (background) {
		return (
			<>
				<HomePage />
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
