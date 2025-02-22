import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { ingredientsActions } from './slices/ingredients/ingredients.slice.ts'
import { cartActions } from './slices/cart/cart.slice.ts'
import { orderActions } from './slices/order/order.slice.ts'

import { userActions } from './slices/user/user.slice.ts'
import { feedActions } from './slices/feed/feed.slice.ts'
import { userOrdersActions } from './slices/orders/orders.slice.ts'

const rootActions = {
	...ingredientsActions,
	...cartActions,
	...orderActions,
	...userActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(rootActions, dispatch)
}
export const useFeedActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(feedActions, dispatch)
}
export const useOrderActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(userOrdersActions, dispatch)
}
