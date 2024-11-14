import cl from './style.module.css'
import clsx from "clsx";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {TIngredient} from "../../data";


export const BurgerIngredient = (props: TIngredient) => {
	const {_id, image, name, price} = props
	const counterFakeState = Math.floor(Math.random() * 10)
	const isShowFakeState = counterFakeState > 0
	return (
		<li key={_id} className={clsx('pl-4 pr-4', cl.item)}>
			<img src={image} className={clsx(cl.img, 'mb-1')}/>
			<p className={clsx(cl.price, 'text text_type_digits-default mb-1')}>{price}<CurrencyIcon
				type="primary"/></p>
			<h4 className={'text text_type_main-default'}>{name}</h4>
			{isShowFakeState && <Counter count={counterFakeState} size="default" extraClass={cl.counter}/>}
		</li>
	);
};
