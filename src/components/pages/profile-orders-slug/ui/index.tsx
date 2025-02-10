import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Modal, useModal } from '../../../shared/ui/modal'
import { useEffect } from 'react'
import { useIngredients } from '../../../shared/hooks/use-ingredients.ts'
import { OrderSummary } from '../../../shared/ui/order-summary/order-summary.tsx'
import { useAppSelector } from '../../../../services'
import { useOrderActions } from '../../../../services/rootActions.ts'

export const ProfileOrdersSlug = () => {
	const { id } = useParams<{ id: string }>()
	const profileOrders = useAppSelector(state => state.userOrder.orders)
	const ingredients = useAppSelector(state => state.ingredients.items)
	const { token } = useAppSelector(state => state.user)
	const currentOrder = profileOrders?.find(item => item._id === id)

	const orderStatus = currentOrder?.status === 'done' ? 'Выполнен' : 'Создан'
	const location = useLocation()
	const navigate = useNavigate()
	useIngredients()
	const handleCloseModal = () => navigate('/profile/orders')

	const { isOpen, handleOpen } = useModal(handleCloseModal)
	const background = location?.state?.background
	const { connect, disconnect } = useOrderActions()

	useEffect(() => {
		if (token) {
			connect()
		}
		handleOpen()
		return () => {
			disconnect()
		}
	}, [token])
	const date = currentOrder ? new Date(currentOrder.createdAt) : new Date()
	if (!currentOrder) return null
	if (background) {
		return (
			<Modal isOpen={isOpen} onClose={handleCloseModal}>
				<OrderSummary
					orderStatus={orderStatus}
					name={currentOrder.name}
					number={currentOrder.number}
					products={ingredients}
					ingredients={currentOrder.ingredients}
					date={date}
				/>
			</Modal>
		)
	}
	return (
		<OrderSummary
			orderStatus={orderStatus}
			name={currentOrder.name}
			number={currentOrder.number}
			products={ingredients}
			ingredients={currentOrder.ingredients}
			date={date}
		/>
	)
}
