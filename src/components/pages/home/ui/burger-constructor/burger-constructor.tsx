import { OrderSummary } from '../order-summary/order-summary'
import cl from './style.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { SyntheticEvent } from 'react'
import clsx from 'clsx'
import { mockData } from '../../data'
import { Modal, useModal } from '../../../../modal'
import { OrderDetails } from '../order-details/order-details'

export const BurgerConstructor = () => {
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		handleOpen()
	}
	const fakeTotalCost = Math.floor(Math.random() * 100)
	const buttonDisabled = fakeTotalCost < 1
	const { isOpen, handleOpen, handleClose } = useModal()
	return (
		<div className={clsx(cl.root, 'mr-4')}>
			<OrderSummary data={mockData} />
			<form onSubmit={handleSubmit} className={cl.form}>
				<p className={clsx('text text_type_digits-medium', cl.price)}>
					{fakeTotalCost}
					<CurrencyIcon type="primary" />
				</p>
				<Button htmlType={'submit'} disabled={buttonDisabled}>
					Оформить заказ
				</Button>
			</form>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<OrderDetails orderNumber={'034536'} />
			</Modal>
		</div>
	)
}
