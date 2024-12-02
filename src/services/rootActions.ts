import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { ingredientsActions } from './slices/ingredients.slice.ts'
import { cartActions } from './slices/cart.slice.ts'
import { orderActions } from './slices/order.slice.ts'
import { previewActions } from './slices/preview.slice.ts'

const actions = {
	...ingredientsActions,
	...cartActions,
	...orderActions,
	...previewActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
