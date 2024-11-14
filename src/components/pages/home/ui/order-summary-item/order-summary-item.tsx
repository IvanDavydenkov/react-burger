import {TIngredient} from "../../data";
import cl from './style.module.css'
import clsx from "clsx";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderSummaryItem = (props: TIngredient) => {
	const {name, price, image} = props
	return (
		<>
			<img src={image} className={clsx(cl.img, 'mr-5')}/>
			<p className={clsx('text text_type_main-default mr-5', cl.title)}>{name}</p>
			<p className={clsx('text text_type_digits-default mr-5', cl.price)}>{price} <CurrencyIcon type="primary"/></p>
		</>
	);
};
