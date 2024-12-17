import { ChangeEvent, useCallback, useRef, useState } from 'react'

export const useFormAndValidation = () => {
	const formRef = useRef<HTMLFormElement>(null)

	const [values, setValues] = useState<{ [key: string]: string }>({})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [isValid, setIsValid] = useState(true)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
		setErrors({ ...errors, [name]: e.target.validationMessage })
		if (formRef.current) setIsValid(formRef.current.checkValidity())
	}
	const resetForm = useCallback(
		(newValues = {}, newErrors = {}, newIsValid = false) => {
			setValues(newValues)
			setErrors(newErrors)
			setIsValid(newIsValid)
		},
		[setValues, setErrors, setIsValid]
	)

	return {
		values,
		handleChange,
		errors,
		setErrors,
		isValid,
		resetForm,
		setValues,
		setIsValid,
		formRef
	}
}
