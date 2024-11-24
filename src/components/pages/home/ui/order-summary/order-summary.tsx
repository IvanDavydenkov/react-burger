import cl from './style.module.css'
import clsx from 'clsx'
import { Ingredient } from '../../data'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const OrderSummary = (props: { data: Ingredient[] }) => {
	const { data } = props
	const indexLast = data.length - 1
	return (
		<ul className={clsx('mt-25 mb-10', cl.summary)}>
			<li className={cl.item} key={data[0]._id}>
				<ConstructorElement
					type={'top'}
					price={data[0].price}
					text={data[0].name + ' (верх)'}
					thumbnail={data[0].image}
					isLocked={true}
				/>
			</li>
			<div className={cl.body}>
				{data.slice(1, indexLast).map((item, index) => {
					return (
						<li className={cl.item} key={item._id + 'summary'}>
							<DragIcon type="primary" className={cl.dragIcon} />
							<ConstructorElement price={item.price} text={item.name} thumbnail={item.image} isLocked={false} />
						</li>
					)
				})}
			</div>

			<li className={cl.item} key={data[0]._id}>
				<ConstructorElement
					type={'bottom'}
					price={data[0].price}
					text={data[0].name + ' (низ)'}
					thumbnail={data[0].image}
					isLocked={true}
				/>
			</li>
		</ul>
	)
}
