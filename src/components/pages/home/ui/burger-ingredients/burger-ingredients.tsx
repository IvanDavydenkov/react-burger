import cl from './style.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'
import { useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../../../../services'
import { ProductType } from '../../../../../services/types/server-response.ts'
import { BurgerIngredientsSection } from '../burger-ingredients-section/burger-ingredients-section.tsx'
import { useInView } from 'react-intersection-observer'

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
export const BurgerIngredients = () => {
	const ingredients = useAppSelector(state => state.ingredients.items)

	const [activeTab, setActiveTab] = useState<tabsItem>(tabsData[0])
	const buns = useMemo(() => ingredients.filter(item => item.type === ProductType.Bun), [ingredients])
	const sauces = useMemo(() => ingredients.filter(item => item.type === ProductType.Sauce), [ingredients])
	const mains = useMemo(() => ingredients.filter(item => item.type === ProductType.Main), [ingredients])

	const bunsRef = useRef<HTMLElement | null>(null)
	const saucesRef = useRef<HTMLElement | null>(null)
	const mainsRef = useRef<HTMLElement | null>(null)

	const [bunsInViewRef, inViewBuns] = useInView({
		threshold: 0
	})
	const [saucesInViewRef, inViewSauces] = useInView({
		threshold: 0
	})
	const [mainsInViewRef, inViewMains] = useInView({
		threshold: 0
	})

	const scrollToSection = (type: tabsItem['value']) => {
		switch (type) {
			case ProductType.Bun:
				bunsRef.current?.scrollIntoView({ behavior: 'smooth' })
				break
			case ProductType.Sauce:
				saucesRef.current?.scrollIntoView({ behavior: 'smooth' })
				break
			case ProductType.Main:
				mainsRef.current?.scrollIntoView({ behavior: 'smooth' })
				break
		}
	}
	const handleSetActiveTab = (tab: tabsItem) => {
		setActiveTab(tab)
		scrollToSection(tab.value)
	}

	const handleSetActiveTabOnScroll = () => {
		if (inViewBuns) {
			setActiveTab(tabsData[0])
		} else if (inViewSauces) {
			setActiveTab(tabsData[1])
		} else if (inViewMains) {
			setActiveTab(tabsData[2])
		}
	}

	return (
		<div className={cl.root}>
			<div className={clsx(cl.tabs, 'mb-10')}>
				{tabsData.map(tab => {
					const { id, value, label } = tab
					const isActive = activeTab.value === tab.value
					const onClick = () => handleSetActiveTab(tab)
					return (
						<Tab active={isActive} value={value} onClick={onClick} key={id}>
							<p className={clsx('text text_type_main-default', { ['text_color_inactive']: isActive })}>{label}</p>
						</Tab>
					)
				})}
			</div>
			<div className={cl.products} onScroll={handleSetActiveTabOnScroll}>
				{!!buns.length && (
					<BurgerIngredientsSection
						items={buns}
						title={'Булки'}
						ref={node => {
							bunsRef.current = node
							bunsInViewRef(node)
						}}
					/>
				)}
				{!!sauces.length && (
					<BurgerIngredientsSection
						items={sauces}
						title={'Соусы'}
						ref={node => {
							saucesRef.current = node
							saucesInViewRef(node)
						}}
					/>
				)}
				{!!mains.length && (
					<BurgerIngredientsSection
						items={mains}
						title={'Начинки'}
						ref={node => {
							mainsRef.current = node
							mainsInViewRef(node)
						}}
					/>
				)}
			</div>
		</div>
	)
}
