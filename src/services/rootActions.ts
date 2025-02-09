import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { ingredientsActions } from './slices/ingredients.slice.ts'
import { cartActions } from './slices/cart.slice.ts'
import { orderActions } from './slices/order.slice.ts'

import { userActions } from './slices/user.slice.ts'
import { feedActions } from './slices/feed.slice.ts'
import { userOrdersActions } from './slices/orders.slice.ts'

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
