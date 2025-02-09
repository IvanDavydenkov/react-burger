import cl from './style.module.css'
import clsx from 'clsx'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../../../../services/types/server-response.ts'
import { nanoid } from 'nanoid'

export interface OrderSummaryProps {
	name: string
	number: number
	orderStatus: string
	date: Date
	ingredients: string[]
	products: Ingredient[]
}

export const OrderSummary = (props: OrderSummaryProps) => {
	const { name, number, orderStatus, ingredients, date, products } = props

	return (
		<div className={cl.container}>
			<p className={clsx('text text_type_digits-default mb-10', cl.id)}>#{number}</p>
			<h1 className={clsx('text text_type_main-medium mb-3')}>{name}</h1>
			<p
				className={clsx('text text_type_main-small mb-15', cl.status, {
					[cl.status_blue]: orderStatus === 'Выполнен'
				})}>
				{orderStatus}
			</p>
			<ul className={clsx('mb-10', cl.list)}>
				<h2 className={clsx('text text_type_main-medium mb-3')}>Состав:</h2>
				<div className={cl.wrapper}>
					{ingredients.map(item => {
						const ingredient = products.find(ingredient => ingredient._id === item)
						const count = ingredients.filter(item => item === ingredient?._id).length
						if (!ingredient) return null
						return (
							<li key={nanoid()} className={clsx('mb-4', cl.item)}>
								<img src={ingredient.image} className={cl.img} alt={''} />
								<p className={'text text_type_main-small'}>{ingredient.name}</p>
								<div className={cl.price}>
									<p className={'text text_type_digits-default'}>{`${count} x ${ingredient.price}`}</p>
									<CurrencyIcon type="primary" />
								</div>
							</li>
						)
					})}
				</div>
			</ul>
			<div className={cl.footer}>
				<FormattedDate date={date} className={'text text_type_main-default text_color_inactive'} />
				<div className={cl.price}>
					<p className={'text text_type_digits-default'}>
						{ingredients.reduce((acc, id) => {
							const price = products.find(item => item._id === id)?.price || 0
							return Number(acc) + Number(price)
						}, 0)}
					</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	)
}
