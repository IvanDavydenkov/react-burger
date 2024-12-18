import { BurgerIngredient } from '../burger-ingredient/burger-ingredient.tsx'
import { Ingredient } from '../../../../../services/types/server-response.ts'
import { forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface BurgerIngredientsSectionProps {
	title: string
	items: Ingredient[]
}

export const BurgerIngredientsSection = forwardRef<HTMLElement, BurgerIngredientsSectionProps>((props, ref) => {
	const { title, items } = props
	const location = useLocation()

	return (
		<section ref={ref} data-type={items[0].type}>
			<h2 className={'mb-6 text text_type_main-medium'}>{title}</h2>
			<ul className={'pl-4 pr-2 mb-10'} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
				{items.map(product => (
					<Link to={`/ingredients/${product._id}`} state={{ background: location }} key={product._id}>
						<BurgerIngredient ingredient={product} key={product._id} />
					</Link>
				))}
			</ul>
		</section>
	)
})

BurgerIngredientsSection.displayName = 'BurgerIngredientsSection'
