import cl from './style.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from '../../../../shared/ui/modal'
import { IngredientDetails } from '../ingredient-details.tsx/ingredient-details'
import { useIngredientModal } from '../../hooks/use-ingredient-modal'
import { useAppSelector } from '../../../../../services'
import { ProductType } from '../../../../../services/types/server-response.ts'
import { BurgerIngredientsSection } from '../burger-ingredients-section/burger-ingredients-section.tsx'

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

	const [activeTab, setActiveTab] = useState<tabsItem>(tabsData[1])
	const { handleClose, isOpen } = useIngredientModal()
	const buns = useMemo(() => ingredients.filter(item => item.type === ProductType.Bun), [ingredients])
	const sauces = useMemo(() => ingredients.filter(item => item.type === ProductType.Sauce), [ingredients])
	const mains = useMemo(() => ingredients.filter(item => item.type === ProductType.Main), [ingredients])
	const bunsRef = useRef<HTMLElement>(null)
	const saucesRef = useRef<HTMLElement>(null)
	const mainsRef = useRef<HTMLElement>(null)

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

	useEffect(() => {
		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const type = entry.target.getAttribute('data-type') as ProductType
					const activeTab = tabsData.find(tab => tab.value === type)
					if (activeTab) {
						setActiveTab(activeTab)
					}
				}
			})
		}

		const observerOptions = {
			root: null,
			rootMargin: '10px',
			threshold: 0.5
		}

		const observer = new IntersectionObserver(observerCallback, observerOptions)

		if (bunsRef.current) observer.observe(bunsRef.current)
		if (saucesRef.current) observer.observe(saucesRef.current)
		if (mainsRef.current) observer.observe(mainsRef.current)

		return () => {
			if (bunsRef.current) observer.unobserve(bunsRef.current)
			if (saucesRef.current) observer.unobserve(saucesRef.current)
			if (mainsRef.current) observer.unobserve(mainsRef.current)
		}
	}, [])
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
			<div className={cl.products}>
				{!!buns.length && <BurgerIngredientsSection items={buns} title={'Булки'} ref={bunsRef} />}
				{!!sauces.length && <BurgerIngredientsSection items={sauces} title={'Соусы'} ref={saucesRef} />}
				{!!mains.length && <BurgerIngredientsSection items={mains} title={'Начинки'} ref={mainsRef} />}
			</div>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<IngredientDetails />
			</Modal>
		</div>
	)
}
