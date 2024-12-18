import { OrderSummary } from '../order-summary/order-summary'
import cl from './style.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { SyntheticEvent } from 'react'
import clsx from 'clsx'
import { Modal, useModal } from '../../../../shared/ui/modal'
import { OrderDetails } from '../order-details/order-details'
import { useCart } from '../../../../shared/hooks/use-cart.ts'
import { useSendOrderMutation } from '../../../../../services/api/order.api.ts'
import { useActions } from '../../../../../services/rootActions.ts'
import { useAuth } from '../../../../shared/hooks/use-auth.ts'
import { useLocation, useNavigate } from 'react-router-dom'

const LOADING_IMAGE_PATH = '/src/images/loading.svg'

export const BurgerConstructor = () => {
	const { totalPrice, cart } = useCart()
	const { isOpen, handleOpen, handleClose } = useModal()
	const [fetchOrder, { isError, isLoading }] = useSendOrderMutation()
	const { setOrder } = useActions()
	const buttonDisabled = !cart.bun
	const navigate = useNavigate()
	const location = useLocation()
	const { isAuth } = useAuth()
	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()
		if (!isAuth) {
			navigate('/login', { state: { prev: location } })
		}
		if (!cart.bun) {
			return
		}
		const payload = {
			ingredients: [cart.bun.orderId, ...cart.items.map(item => item.orderId), cart.bun.orderId]
		}
		try {
			const res = await fetchOrder(payload)
			if (res?.data) {
				setOrder({ order: res.data.order.number })
			}
		} catch (e) {
		} finally {
			handleOpen()
		}
	}
	return (
		<div className={clsx(cl.root, 'mr-4')}>
			<OrderSummary />
			<form onSubmit={handleSubmit} className={cl.form}>
				<p className={clsx('text text_type_digits-medium', cl.price)}>
					{totalPrice}
					<CurrencyIcon type="primary" />
				</p>
				<Button htmlType={'submit'} disabled={buttonDisabled || isLoading}>
					{!isLoading && ' Оформить заказ'}
					{isLoading && (
						<img src={LOADING_IMAGE_PATH} alt={'готовим бургер...'} style={{ maxHeight: '80px', maxWidth: '80px' }} />
					)}
				</Button>
			</form>
			<Modal isOpen={isOpen} onClose={handleClose}>
				{!isError && <OrderDetails />}
				{isError && <h2>Вышла ошибочка, попробуйте позже</h2>}
			</Modal>
		</div>
	)
}
