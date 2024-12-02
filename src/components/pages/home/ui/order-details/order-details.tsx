import cl from './style.module.css'
import clsx from 'clsx'
import doneImage from '../../../../../images/done.png'
import { useAppSelector } from '../../../../../services'
import { useEffect } from 'react'
import { useActions } from '../../../../../services/rootActions.ts'

export const OrderDetails = () => {
	const data = useAppSelector(state => state.order)
	const { setOrder } = useActions()

	useEffect(() => {
		return () => {
			setOrder({ order: null }) // Чистим модалку, хороший тон так сказать
		}
	}, [])
	return (
		<div className={clsx(cl.root, 'pt-30')}>
			<h2 className={clsx('text text_type_digits-large mb-8')}>{data?.order}</h2>
			<p className={'text text_type_main-default mb-15'}>идентификатор заказа</p>
			<img src={doneImage} alt={'done'} className={'mb-15'} />
			<p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}
