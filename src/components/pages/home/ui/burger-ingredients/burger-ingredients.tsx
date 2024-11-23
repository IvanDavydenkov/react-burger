import cl from './style.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'
import { useState } from 'react'
import { Ingredient } from '../../data'
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'
import { Modal } from '../../../../modal'
import { IngredientDetails } from '../ingredient-details.tsx/ingredient-details'
import { useIngredientModal } from '../../hooks/use-ingredient-modal'

export const enum ProductType {
	Bun = 'bun',
	Sauce = 'sauce',
	Main = 'main'
}

interface tabsItem {
	id: number
	value: ProductType
	label: string
}

export const tabsData: tabsItem[] = [
	{
		id: 1,
		value: ProductType.Bun,
		label: 'Булки'
	},
	{
		id: 2,
		value: ProductType.Sauce,
		label: 'Соусы'
	},
	{
		id: 3,
		value: ProductType.Main,
		label: 'Начинки'
	}
]
export const BurgerIngredients = (props: { items: Ingredient[] }) => {
	const { items } = props
	const [activeTab, setActiveTab] = useState<tabsItem>(tabsData[0])
	const sortedItems = items.filter(item => item.type === activeTab.value)
	const { activeIngredient, handleSetActiveIngredient, handleClose, isOpen } = useIngredientModal(items)
	return (
		<div className={cl.root}>
			<div className={clsx(cl.tabs, 'mb-10')}>
				{tabsData.map(tab => {
					const { id, value, label } = tab
					const isActive = activeTab.value === tab.value
					const onClick = () => setActiveTab(tab)
					return (
						<Tab active={isActive} value={value} onClick={onClick} key={id}>
							<p className={clsx('text text_type_main-default', { ['text_color_inactive']: isActive })}>{label}</p>
						</Tab>
					)
				})}
			</div>
			<div className={cl.products}>
				<section>
					<h2 className={'mb-6 text text_type_main-medium'}>{activeTab.label}</h2>
					<ul className={clsx(cl.list, 'pl-4 pr-2 mb-10')}>
						{sortedItems.map(item => {
							return <BurgerIngredient ingredient={item} onClick={handleSetActiveIngredient} key={item._id} />
						})}
					</ul>
				</section>
			</div>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<IngredientDetails {...activeIngredient} />
			</Modal>
		</div>
	)
}
