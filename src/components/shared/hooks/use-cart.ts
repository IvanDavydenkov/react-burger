import { useActions } from '../../../services/rootActions.ts'
import { Ingredient } from '../../../services/types/server-response.ts'
import { useAppSelector } from '../../../services'
import { useMemo } from 'react'

export const useCart = () => {
	const actions = useActions()
	const cart = useAppSelector(state => state.cart)

	const bunPrice = cart.bun ? Number(cart.bun.price) * 2 : 0
	const totalPrice = useMemo((): number => {
		if (!cart.items || (cart.items.length === 0 && !cart.bun)) {
			return 0
		}
		if ((!cart.items || cart.items.length === 0) && cart.bun) return bunPrice
		return cart.items.reduce((acc, item) => acc + Number(item.price), 0) + bunPrice
	}, [cart, bunPrice])

	const handleDeleteFromCart = (id: string) => {
		actions.removeItemFromCart(id)
	}
	const handleAddItem = (item: Ingredient) => {
		actions.addItemToCart(item)
	}
	const setBun = (item: Ingredient) => {
		actions.setBun(item)
	}
	const updateCart = () => {}

	return {
		removeItem: handleDeleteFromCart,
		addItem: handleAddItem,
		updateCart,
		cart,
		totalPrice,
		setBun
	}
}
