import cl from './style.module.css'
import { BurgerIngredients } from './burger-ingredients/burger-ingredients'
import { BurgerConstructor } from './burger-constructor/burger-constructor'
import { useGetIngredientsQuery } from '../api/ingredients.api'

export const HomePage = () => {
	const { data, isError } = useGetIngredientsQuery()
	if (isError) {
		return <h1>Произошла ошибка, попробуйте позже</h1>
	}
	return (
		<div className={cl.root}>
			<section>
				<h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
				{data && <BurgerIngredients items={data.data} />}
			</section>

			<BurgerConstructor />
		</div>
	)
}
