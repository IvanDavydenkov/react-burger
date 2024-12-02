import cl from './style.module.css'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useActions } from '../../../../../services/rootActions.ts'
import { useAppSelector } from '../../../../../services'

export const IngredientDetails = () => {
	const preview = useAppSelector(state => state.preview.preview)
	const specs = [
		{ value: preview?.calories, label: 'Калории,ккал', id: '001' },
		{ value: preview?.proteins, label: 'Белки, г', id: '002' },
		{ value: preview?.fat, label: 'Жиры, г', id: '003' },
		{ value: preview?.carbohydrates, label: 'Углеводы, г', id: '004' }
	]
	const actions = useActions()

	useEffect(() => {
		return () => {
			// Удаляю стейт при размонтировании
			actions.resetPreview()
		}
	}, [])
	return (
		<div className={cl.root}>
			<p className={clsx('text text_type_main-large')}>Детали ингредиента</p>
			<img src={preview?.image_large} alt={preview?.name} className={clsx('mb-4', cl.img)} />
			<h2 className={clsx('text text_type_main-medium mb-8', cl.title)}>{preview?.name}</h2>
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
