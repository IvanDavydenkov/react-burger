import cl from './style.module.css'
import clsx from 'clsx'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../data'

export const BurgerIngredient = (props: Ingredient & { onClick: (id: string) => void }) => {
	const { _id, image, name, price, onClick } = props
	const counterFakeState = Math.floor(Math.random() * 10)
	const isShowFakeState = counterFakeState > 0
	const handleClick = () => {
		onClick(_id)
	}
	return (
		<li key={_id} className={clsx('pl-4 pr-4', cl.item)} onClick={handleClick}>
			<img src={image} className={clsx(cl.img, 'mb-1')} alt={''} />
			<p className={clsx(cl.price, 'text text_type_digits-default mb-1')}>
				{price}
				<CurrencyIcon type="primary" />
			</p>
			<h4 className={'text text_type_main-default'}>{name}</h4>
			{isShowFakeState && <Counter count={counterFakeState} size="default" extraClass={cl.counter} />}
		</li>
	)
}
