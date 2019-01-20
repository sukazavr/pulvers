import React from 'react'
import { classes, keyframes, style } from 'typestyle'
import { actionsApp } from '../@app/actions'
import { IProfile } from '../@app/typesApp'
import { ButtonRemove, ButtonRefresh } from '../@components/Buttons'
import { redColor } from '../@app/theme'

export const LoadedCard = ({
	profile: { id, name, url, avatar, appsCount, appsHidden },
}: {
	profile: IProfile
}) => {
	return (
		<div className={$container}>
			<ButtonRefresh
				onClick={() => actionsApp.addProfile(id)}
				style={{ position: 'absolute', bottom: '-.5em', left: '-.9em', zIndex: 1 }}
			/>
			<ButtonRemove
				onClick={() => actionsApp.removeProfile(id)}
				style={{ position: 'absolute', top: '-.9em', right: '-.9em', zIndex: 1 }}
			/>
			<a href={url} target="_blank" title="Open Steam profile page">
				<div className={$avatar} style={{ backgroundImage: `url(${avatar})` }} />
			</a>
			<div className={$info}>
				<div className={$name}>{name}</div>
				{appsHidden && (
					<div className={$hidden} title='User have to set "Game details" as "Public"'>
						Game library is hidden
						<br />
						Profile <b>ignored</b> ⚠️
					</div>
				)}
				{!appsHidden && (
					<div className={$sub}>{`${appsCount} game${appsCount > 1 ? 's' : ''}`}</div>
				)}
			</div>
		</div>
	)
}

export const LoadingCard = ({ steamID }: { steamID: string }) => (
	<div className={$container}>
		<ButtonRemove
			onClick={() => actionsApp.removeProfile(steamID)}
			style={{ position: 'absolute', top: '-.9em', right: '-.9em', zIndex: 1 }}
		/>
		<div className={classes($avatar, $loading)} />
		<div className={$info}>
			<div className={$name}>{steamID}</div>
			<div className={classes($sub, $loading)} style={{ width: '6em', height: '.5em' }} />
		</div>
	</div>
)

const $container = style({
	display: 'flex',
	height: '4.4em',
	maxWidth: '22em',
	padding: '0.6em',
	paddingBottom: 0,
	background: '#fff',
	border: '1px solid #c3c3c3',
	borderRadius: '0.5em',
	position: 'relative',
})

const $avatar = style({
	flexShrink: 0,
	width: '3em',
	height: '3em',
	borderRadius: '50%',
	backgroundSize: 'cover',
})

const $info = style({
	overflow: 'hidden',
	marginLeft: '.4em',
})

const $name = style({
	marginRight: '.8em',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
})

const $sub = style({
	marginTop: '.6em',
})

const $hidden = style({
	marginTop: '.2em',
	color: redColor,
	fontSize: '0.9em',
})

const $loading = style({
	animationDuration: '1s',
	animationFillMode: 'forwards',
	animationIterationCount: 'infinite',
	animationName: keyframes({
		'0%': { backgroundPosition: '-468px 0' },
		'100%': { backgroundPosition: '468px 0' },
	}),
	animationTimingFunction: 'linear',
	background: 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)',
	backgroundSize: '800px 104px',
	position: 'relative',
})
