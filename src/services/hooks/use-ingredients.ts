import { useGetIngredientsQuery } from '../api/ingredients.api.ts'
import { useActions } from '../rootActions.ts'
import { useEffect } from 'react'
import { useAppSelector } from '../index.ts'

export const useIngredients = () => {
	const ingredients = useAppSelector(state => state.ingredients.items)
	const { data, isError, isLoading } = useGetIngredientsQuery(undefined, { skip: ingredients.length > 0 })

	const actions = useActions()

	useEffect(() => {
		if (data) {
			actions.setIngredients(data.data)
		}
	}, [data])
	return {
		isLoading,
		isError
	}
}
