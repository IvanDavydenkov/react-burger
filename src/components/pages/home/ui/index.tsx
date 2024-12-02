import cl from './style.module.css'
import { BurgerConstructor } from './burger-constructor/burger-constructor'
import { useIngredients } from '../../../../services/hooks/use-ingredients.ts'
import { BurgerIngredients } from './burger-ingredients/burger-ingredients.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const HomePage = () => {
	const { isError } = useIngredients()

	if (isError) {
		return <h1>Произошла ошибка, попробуйте позже</h1>
	}
	return (
		<DndProvider backend={HTML5Backend}>
			<div className={cl.root}>
				<section>
					<h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
					<BurgerIngredients />
				</section>
				<BurgerConstructor />
			</div>
		</DndProvider>
	)
}
