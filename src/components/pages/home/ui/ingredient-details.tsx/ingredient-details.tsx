import cl from './style.module.css'
import { Ingredient } from '../../data'
import clsx from 'clsx'

export const IngredientDetails = (props: Ingredient) => {
	const { name, fat, calories, carbohydrates, proteins, image_large } = props
	console.log(props)
	const specs = [
		{ value: calories, label: 'Калории,ккал', id: '001' },
		{ value: proteins, label: 'Белки, г', id: '002' },
		{ value: fat, label: 'Жиры, г', id: '003' },
		{ value: carbohydrates, label: 'Углеводы, г', id: '004' }
	]
	return (
		<div className={cl.root}>
			<p className={clsx('text text_type_main-large')}>Детали ингредиента</p>
			<img src={image_large} alt={name} className={clsx('mb-4', cl.img)} />
			<h2 className={clsx('text text_type_main-medium mb-8', cl.title)}>{name}</h2>
			<ul className={cl.list}>
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
