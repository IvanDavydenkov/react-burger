import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../services'
import { OrderSummary } from '../../../shared/ui/order-summary/order-summary.tsx'
import { useIngredients } from '../../../shared/hooks/use-ingredients.ts'
import { Modal, useModal } from '../../../shared/ui/modal'
import { useEffect } from 'react'
import { useFeedActions } from '../../../../services/rootActions.ts'
import cl from './style.module.css'

export const FeedSlugPage = () => {
	const { id } = useParams<{ id: string }>()
	const allOrders = useAppSelector(state => state.feed.orders)
	const ingredients = useAppSelector(state => state.ingredients.items)
	const currentOrder = allOrders?.find(item => item._id === id)
	const orderStatus = currentOrder?.status === 'done' ? 'Выполнен' : 'Создан'

	const location = useLocation()
	const navigate = useNavigate()
	useIngredients()
	const handleCloseModal = () => navigate('/feed')

	const { isOpen, handleOpen } = useModal(handleCloseModal)
	const background = location?.state?.background
	const { connect, disconnect } = useFeedActions()
	useEffect(() => {
		connect()
		handleOpen()

		return () => {
			disconnect()
		}
	}, [])

	if (!currentOrder) return null
	const date = new Date(currentOrder.createdAt)

	if (background) {
		return (
			<Modal onClose={handleCloseModal} isOpen={isOpen}>
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
		<div className={cl.root}>
			<OrderSummary
				orderStatus={orderStatus}
				name={currentOrder.name}
				number={currentOrder.number}
				products={ingredients}
				ingredients={currentOrder.ingredients}
				date={date}
			/>
		</div>
	)
}
