import React from 'react'
import { style, classes } from 'typestyle'
import { $tappable } from '../@app/theme'

export const ButtonRemove = (props: React.HTMLProps<HTMLButtonElement>) => (
	<button className={$btn} {...props}>
		<svg
			className={$ico}
			role="img"
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
		>
			<title>Remove</title>
			<path d="m15.9 30.7v-15.7q0-0.3-0.2-0.5t-0.5-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v15.7q0 0.3 0.2 0.5t0.5 0.2h1.4q0.3 0 0.5-0.2t0.2-0.5z m5.7 0v-15.7q0-0.3-0.2-0.5t-0.5-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v15.7q0 0.3 0.2 0.5t0.5 0.2h1.4q0.3 0 0.5-0.2t0.2-0.5z m5.8 0v-15.7q0-0.3-0.2-0.5t-0.6-0.2h-1.4q-0.3 0-0.5 0.2t-0.2 0.5v15.7q0 0.3 0.2 0.5t0.5 0.2h1.4q0.4 0 0.6-0.2t0.2-0.5z m-12.2-22.1h10l-1.1-2.6q-0.1-0.2-0.3-0.3h-7.1q-0.2 0.1-0.4 0.3z m20.7 0.7v1.4q0 0.3-0.2 0.5t-0.5 0.2h-2.1v21.2q0 1.8-1.1 3.2t-2.5 1.3h-18.6q-1.4 0-2.5-1.3t-1-3.1v-21.3h-2.2q-0.3 0-0.5-0.2t-0.2-0.5v-1.4q0-0.3 0.2-0.5t0.5-0.2h6.9l1.6-3.8q0.3-0.8 1.2-1.4t1.7-0.5h7.2q0.9 0 1.8 0.5t1.2 1.4l1.5 3.8h6.9q0.3 0 0.5 0.2t0.2 0.5z" />
		</svg>
	</button>
)

export const ButtonRefresh = (props: React.HTMLProps<HTMLButtonElement>) => (
	<button className={$btn} {...props}>
		<svg
			className={$ico}
			role="img"
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
		>
			<title>Refresh</title>
			<path d="m19.8 3.8c8.9 0 16.2 7.2 16.2 16.2s-7.3 16.3-16.2 16.3-16.3-7.3-16.3-16.3 7.3-16.2 16.3-16.2z m0 26.2c5.5 0 10-4.5 10-10h-1.6c0 4.7-3.8 8.4-8.5 8.4s-8.4-3.7-8.4-8.4 3.8-8.4 8.5-8.4v4.3l7.5-4.3-7.5-5v3.4c-5.6 0-10 4.5-10 10s4.4 10 10 10z" />
		</svg>
	</button>
)

export const ButtonBuy = (props: React.HTMLProps<HTMLButtonElement>) => (
	<button className={$btn} {...props}>
		<svg
			className={$ico}
			role="img"
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
		>
			<title>Open product page</title>
			<path d="m12.5 31.3c1 0 1.9 0.8 1.9 1.8s-0.9 1.9-1.9 1.9-1.9-0.9-1.9-1.9 0.9-1.8 1.9-1.8z m17.5 0c1 0 1.9 0.8 1.9 1.8s-0.9 1.9-1.9 1.9-1.9-0.9-1.9-1.9 0.9-1.8 1.9-1.8z m5-21.3l-1.2 10-21.2 3.8 0.4 2.3c0.5 2.7 1.6 2.7 2 2.7h18.8v1.2h-18.8c-0.9 0-1.6-0.4-2.2-1.1-0.5-0.6-0.8-1.5-1-2.6l-3.4-18.3c-0.1-0.6-0.2-0.9-0.5-1.2-0.5-0.4-1.4-0.5-2.9-0.5v-1.3c1.8 0 3 0.3 3.7 0.9 0.5 0.4 0.8 1.1 0.9 1.6z" />
		</svg>
	</button>
)

const $btn = classes(
	$tappable,
	style({
		padding: '.3em',
		lineHeight: 0,
	})
)

const $ico = style({
	width: '2em',
	height: '2em',
})
