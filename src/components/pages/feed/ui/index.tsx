import cl from './style.module.css'
import { OrderItem } from '../../../widgets/order-item/order-item.tsx'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useFeedActions } from '../../../../services/rootActions.ts'
import { useAppSelector } from '../../../../services'
import { useIngredients } from '../../../shared/hooks/use-ingredients.ts'

export const FeedPage = () => {
	useIngredients()

	const ready = ['034533', '034532', '034530', '034527', '034525']
	const process = ['034538', '034541', '034542']

	const { orders, total, totalToday } = useAppSelector(state => state.feed)
	const ingredients = useAppSelector(state => state.ingredients.items)
	const { connect, disconnect } = useFeedActions()
	useEffect(() => {
		connect()
		return () => {
			disconnect()
		}
	}, [])

	return (
		<div className={cl.root}>
			<h1 className={'text text_type_main-large mb-5'}>Лента заказов</h1>
			<div className={cl.body}>
				<div className={cl.orders}>
					{orders?.map(order => (
						<OrderItem
							key={order._id}
							{...order}
							fullIngriedients={order.ingredients
								.map(ingredient => ingredients.find(item => item._id === ingredient))
								.filter(item => !!item)}
						/>
					))}
				</div>
				<div className={cl.summary}>
					<div className={clsx(cl.listWrapper)}>
						<ul>
							<p className={'text text_type_main-medium mb-6'}>Готовы:</p>
							{ready.map(item => (
								<li key={item} className={'text text_type_main-medium'} style={{ color: '#0CC' }}>
									{item}
								</li>
							))}
						</ul>
						<ul>
							<p className={'text text_type_main-medium mb-6'}>В&nbsp;работе:</p>
							{process.map(item => (
								<li key={item} className={'text text_type_digits-default'}>
									{item}
								</li>
							))}
						</ul>
					</div>
					<section className={cl.section}>
						<p className={'text text_type_main-medium'}>Выполнено за все время:</p>
						<p className={clsx(cl.count, 'text text_type_digits-large')}>{total}</p>
					</section>
					<section className={cl.section}>
						<p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
						<p className={clsx(cl.count, 'text text_type_digits-large')}>{totalToday}</p>
					</section>
				</div>
			</div>
		</div>
	)
}
