import React from 'react'
import ReactDOM from 'react-dom'
import { Landing } from './Landing'
import { forceRenderStyles } from 'typestyle'

document.head.insertAdjacentHTML(
	'beforeend',
	'<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">'
)

forceRenderStyles()

const render = async () => {
	ReactDOM.render(React.createElement(Landing), document.getElementById('app'))
}

render()

export default render
