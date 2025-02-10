import { useEffect } from 'react'
import { useOrderActions } from '../../../../services/rootActions.ts'
import { useAppSelector } from '../../../../services'
import { OrderItem } from '../../../widgets/order-item/order-item.tsx'
import cl from './style.module.css'
import { nanoid } from 'nanoid'

export const OrderPage = () => {
	const { connect, disconnect } = useOrderActions()
	const { orders } = useAppSelector(state => state.userOrder)
	const ingredients = useAppSelector(state => state.ingredients.items)
	useEffect(() => {
		connect()
		return () => {
			disconnect()
		}
	}, [])

	return (
		<div className={cl.list}>
			{orders?.map(order => (
				<OrderItem
					key={nanoid()}
					{...order}
					fullIngriedients={order.ingredients
						.map(ingredient => ingredients.find(item => item._id === ingredient))
						.filter(item => !!item)}
				/>
			))}
		</div>
	)
}
