import cl from './style.module.css'
import clsx from 'clsx'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCart } from '../../../../shared/hooks/use-cart.ts'
import { useDrop } from 'react-dnd'
import { Ingredient, ProductType } from '../../../../../services/types/server-response.ts'
import { OrderItem } from '../order-item/order-item.tsx'
import { nanoid } from 'nanoid'
import { useActions } from '../../../../../services/rootActions.ts'

const LOADING_IMAGE_PATH = '/src/images/loading.svg'

export const OrderSummary = () => {
	const { cart, addItem, setBun, removeItem } = useCart()
	const { increaseIngredientCount } = useActions()
	const data = cart?.items

	const [{ isHover }, dropTarget] = useDrop({
		accept: [ProductType.Bun, ProductType.Main, ProductType.Sauce],
		drop(item: Ingredient) {
			const newId = nanoid()
			const payload = { ...item, _id: newId, orderId: item._id }
			switch (item.type) {
				case ProductType.Bun:
					setBun(payload)
					return
				case ProductType.Sauce:
					addItem(payload)
					increaseIngredientCount(item)
					return
				case ProductType.Main:
					addItem(payload)
					increaseIngredientCount(item)
					return
				default:
					return null
			}
		},
		collect: monitor => ({
			isHover: monitor.isOver()
		})
	})

	return (
		<ul className={clsx('mt-25 mb-10', cl.summary, { [cl.summary_ondrag]: isHover })} ref={dropTarget}>
			<li className={cl.item}>
				<ConstructorElement
					type={'top'}
					price={cart?.bun?.price || 0}
					text={(cart?.bun?.name || 'Перетяните булочку сюда') + ' (верх)'}
					thumbnail={cart?.bun?.image || LOADING_IMAGE_PATH}
					isLocked={true}
				/>
			</li>

			<div className={clsx(cl.body, { [cl.body_empty]: data.length === 0 })}>
				{data.map(item => {
					return <OrderItem item={item} key={item._id} onClick={removeItem} />
				})}
				{data.length === 0 && (
					<ConstructorElement
						price={0}
						text={'Наполни меня!'}
						thumbnail={LOADING_IMAGE_PATH}
						isLocked={true}
						extraClass={cl.empty}
					/>
				)}
			</div>

			<li className={cl.item}>
				<ConstructorElement
					type={'bottom'}
					price={cart?.bun?.price || 0}
					text={(cart?.bun?.name || 'Перетяните булочку сюда') + ' (низ)'}
					thumbnail={cart?.bun?.image || LOADING_IMAGE_PATH}
					isLocked={true}
				/>
			</li>
		</ul>
	)
}
