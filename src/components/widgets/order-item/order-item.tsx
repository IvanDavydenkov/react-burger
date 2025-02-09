import cl from './style.module.css'
import clsx from 'clsx'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Order } from '../../../services/types/feed.ts'
import { Ingredient } from '../../../services/types/server-response.ts'
import { Link, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid'

export const OrderItem = (props: Order & { fullIngriedients?: Ingredient[] }) => {
	const { name, number, createdAt, fullIngriedients = [], _id, status } = props
	const date = new Date(createdAt)
	const price = fullIngriedients.reduce((acc, item) => acc + item.price, 0)
	const statusBook = {
		done: 'Готово',
		pending: 'Готовится',
		created: 'Создан'
	}
	const locations = useLocation()

	return (
		<div className={clsx(cl.item, 'p-6')}>
			<div className={clsx(cl.header, 'mb-6')}>
				<h4 className={'text text_type_digits-default'}>{`#${number}`}</h4>
				<FormattedDate date={date} className={'text text_type_main-default text_color_inactive'} />
			</div>
			<h3 className={'text text_type_main-medium mb-2'}>
				<Link to={`${_id}`} state={{ background: locations }}>
					{name}
				</Link>
			</h3>
			<p className={clsx('text text_type_main-small mb-6', cl.status, { [cl.status_done]: status === 'done' })}>
				{statusBook[status] || 'Создан'}
			</p>
			<div className={clsx('mb-6', cl.bottom)}>
				<div className={cl.imgs}>
					{fullIngriedients.map((item, index) => (
						<img alt={''} key={nanoid()} src={item.image} className={cl.img} style={{ zIndex: 10 - index }} />
					))}
				</div>
				<div className={cl.price}>
					<p className={'text text_type_digits-default'}>{price}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	)
}
