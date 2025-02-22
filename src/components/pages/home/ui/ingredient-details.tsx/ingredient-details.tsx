import cl from './style.module.css'
import clsx from 'clsx'
import { useAppSelector } from '../../../../../services'
import { useParams } from 'react-router-dom'

export const IngredientDetails = () => {
	const params = useParams()
	const ingredients = useAppSelector(state => state.ingredients.items)

	const currentIngredient = ingredients.find(item => item._id === params.id)
	const specs = [
		{ value: currentIngredient?.calories, label: 'Калории,ккал', id: '001' },
		{ value: currentIngredient?.proteins, label: 'Белки, г', id: '002' },
		{ value: currentIngredient?.fat, label: 'Жиры, г', id: '003' },
		{ value: currentIngredient?.carbohydrates, label: 'Углеводы, г', id: '004' }
	]

	return (
		<div className={cl.root}>
			<p className={clsx('text text_type_main-large')}>Детали ингредиента</p>
			<img src={currentIngredient?.image_large} alt={currentIngredient?.name} className={clsx('mb-4', cl.img)} />
			<h2 className={clsx('text text_type_main-medium mb-8', cl.title)}>{currentIngredient?.name}</h2>
			<ul className={cl.list} data-cy={'ingredient-description'}>
				{specs.map(({ value, label, id }) => (
					<li key={id}>
						<p className="text text_type_main-default text_color_inactive">{label}</p>
						<p className="text text_type_digits-default text_color_inactive">{value}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
