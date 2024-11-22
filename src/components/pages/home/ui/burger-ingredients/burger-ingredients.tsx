import cl from './style.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'
import { useState } from 'react'
import { Ingredient } from '../../data'
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'

interface tabsItem {
	id: number
	value: string
	label: string
}

export const tabsData: tabsItem[] = [
	{
		id: 1,
		value: 'bun',
		label: 'Булки'
	},
	{
		id: 2,
		value: 'sauce',
		label: 'Соусы'
	},
	{
		id: 3,
		value: 'main',
		label: 'Начинки'
	}
]
export const BurgerIngredients = (props: { items: Ingredient[] }) => {
	const { items } = props
	const [activeTab, setActiveTab] = useState<tabsItem>(tabsData[0])

	const sortedItems = items.filter(item => item.type === activeTab.value)
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
							return <BurgerIngredient {...item} />
						})}
					</ul>
				</section>
			</div>
		</div>
	)
}
