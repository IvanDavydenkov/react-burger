import { BurgerIngredient } from '../burger-ingredient/burger-ingredient.tsx'
import { Ingredient } from '../../../../../services/types/server-response.ts'
import { forwardRef } from 'react'

interface BurgerIngredientsSectionProps {
	title: string
	items: Ingredient[]
	onClick: (product: Ingredient) => void
}

export const BurgerIngredientsSection = forwardRef<HTMLElement, BurgerIngredientsSectionProps>((props, ref) => {
	const { title, items, onClick } = props

	return (
		<section ref={ref} data-type={items[0].type}>
			<h2 className={'mb-6 text text_type_main-medium'}>{title}</h2>
			<ul className={'pl-4 pr-2 mb-10'} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
				{items.map(product => (
					<BurgerIngredient ingredient={product} onClick={onClick} key={product._id} />
				))}
			</ul>
		</section>
	)
})

BurgerIngredientsSection.displayName = 'BurgerIngredientsSection'
