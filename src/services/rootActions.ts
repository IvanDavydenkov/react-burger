import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { ingredientsActions } from './slices/ingredients.slice.ts'
import { cartActions } from './slices/cart.slice.ts'
import { orderActions } from './slices/order.slice.ts'

import { userActions } from './slices/user.slice.ts'

const actions = {
	...ingredientsActions,
	...cartActions,
	...orderActions,
	...userActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
