import cl from './style.module.css'
import clsx from "clsx";
import {TIngredient} from "../../data";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderSummary = (props: { data: TIngredient[] }) => {
	const {data} = props;

	return (
		<ul className={clsx('mt-25 mb-10', cl.summary)}>
			{data.map((item, index) => {
					const isLast = index === data.length - 1
					const isFirst = index === 0
					const isLastOrFirst = isFirst || isLast
					const type = !isLastOrFirst ? undefined : isLast ? 'bottom' : 'top'
					return (
						<li className={cl.item} key={item._id}>
							{!isLastOrFirst && <DragIcon type="primary" className={cl.dragIcon}/>}
							<ConstructorElement type={type} price={item.price} text={item.name} thumbnail={item.image}
																	isLocked={isLastOrFirst}/>
						</li>
					)
				}
			)}
		</ul>
	);
};
