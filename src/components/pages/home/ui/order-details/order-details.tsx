import cl from './style.module.css'
import clsx from 'clsx'
import doneImage from '../../../../../images/done.png'

export interface Order {
	orderNumber: string
}

export const OrderDetails = (props: Order) => {
	const { orderNumber = '034536' } = props
	return (
		<div className={clsx(cl.root, 'pt-30')}>
			<h2 className={clsx('text text_type_digits-large mb-8')}>{orderNumber}</h2>
			<p className={'text text_type_main-default mb-15'}>идентификатор заказа</p>
			<img src={doneImage} alt={'done'} className={'mb-15'} />
			<p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}
