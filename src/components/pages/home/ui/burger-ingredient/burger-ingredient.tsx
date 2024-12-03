import cl from './style.module.css'
import clsx from 'clsx'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../../../../services/types/server-response.ts'
import { useDrag } from 'react-dnd'

export const BurgerIngredient = (props: { ingredient: Ingredient } & { onClick: (id: Ingredient) => void }) => {
	const { ingredient, onClick } = props
	const { image, name, price, count } = ingredient

	const [{ isHover }, dragRef] = useDrag({
		type: ingredient.type,
		item: ingredient,
		collect: monitor => ({
			isHover: monitor.isDragging()
		})
	})
	const handleClick = () => {
		onClick(ingredient)
	}
	return (
		<li className={clsx('pl-4 pr-4', cl.item, { [cl.item_ondrag]: isHover })} onClick={handleClick} ref={dragRef}>
			<img src={image} className={clsx(cl.img, 'mb-1')} alt={name} />
			<p className={clsx(cl.price, 'text text_type_digits-default mb-1')}>
				{price}
				<CurrencyIcon type="primary" />
			</p>
			<h4 className={'text text_type_main-default'}>{name}</h4>
			{count && <Counter count={count} size="default" extraClass={cl.counter} />}
		</li>
	)
}
