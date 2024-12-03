import cl from './style.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../../../../../services/types/server-response.ts'
import { useDrag, useDrop } from 'react-dnd'
import { useActions } from '../../../../../services/rootActions.ts'

export const OrderItem = (props: { item: Ingredient; onClick: (id: string) => void }) => {
	const { item, onClick } = props
	const { decreaseIngredientCount, sortCart } = useActions()
	const [, dragRef] = useDrag({
		type: 'sort',
		item: item,
		collect: monitor => ({
			isHover: monitor.isDragging()
		})
	})

	const [, dropRef] = useDrop({
		accept: 'sort',
		drop(dropElement: Ingredient) {
			sortCart({ currentId: dropElement._id, targetId: item._id })
		}
	})
	const handleRemove = () => {
		onClick(item._id)
		decreaseIngredientCount(item)
	}

	return (
		<div ref={dropRef}>
			<li className={cl.item} ref={dragRef}>
				<DragIcon type="primary" className={cl.dragIcon} />
				<ConstructorElement
					price={item.price}
					text={item.name}
					thumbnail={item.image}
					isLocked={false}
					handleClose={handleRemove}
				/>
			</li>
		</div>
	)
}
