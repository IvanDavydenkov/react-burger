import cl from './style.module.css'
import {BurgerIngredients} from "./burger-ingredients/burger-ingredients";
import {mockData} from "../data";
import {BurgerConstructor} from "./burger-constructor/burger-constructor";

export const HomePage = () => {
	return (
		<div className={cl.root}>
			<section>
				<h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
				<BurgerIngredients items={mockData}/>
			</section>

			<BurgerConstructor/>
		</div>
	);
};
