import { types, style } from 'typestyle'

export const fontStack = "Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif"
export const fontMonoStack = "Monaco, Menlo, Consolas, 'Courier New', monospace"

export const blackColor = '#191817'
export const redColor = '#ff007f'

export const mainFGColor = '#000'
export const mainBGColor = '#FFFAED'

export const $tappable = style({
	cursor: 'pointer',
	userSelect: 'none',
})

type BoxUnit = number | string
const boxUnitToString = (value: BoxUnit): string => {
	if (typeof value === 'number') {
		return value.toString() + 'em'
	} else {
		return value
	}
}

export const gridSpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		marginTop: '-' + spacing,
		marginLeft: '-' + spacing,
		'&>*': {
			marginTop: spacing,
			marginLeft: spacing,
		},
	} as types.CSSProperties
}

export const verticallySpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		'&>*': {
			marginBottom: spacing + ' !important',
		},
		'&>*:last-child': {
			marginBottom: '0px !important',
		},
	} as types.CSSProperties
}

export const horizontallySpaced = (margin: BoxUnit) => {
	const spacing = boxUnitToString(margin)
	return {
		'&>*': {
			marginRight: spacing + ' !important',
		},
		'&>*:last-child': {
			marginRight: '0px !important',
		},
	} as types.CSSProperties
}
