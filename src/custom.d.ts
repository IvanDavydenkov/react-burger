declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.png' {
	const value: string
	export default value
}
declare module '*.css' {
	const content: { [className: string]: string }
	export default content
}
declare module '*.svg' {
	const content: { [className: string]: string }
	export default content
}
