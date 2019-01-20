import React from 'react'
import { style } from 'typestyle'
import { IProfile } from '../@app/typesApp'
import { ButtonBuy } from '../@components/Buttons'
import { IcoMultiplayer, IcoTime, IcoCoop } from '../@components/Icons'
import { IAugmentedApp } from './typesResults'

export const AppCard = ({
	full,
	app: {
		data: { id, name, cover, flags },
		extra: { totalPlaytime, buyers, owners },
	},
}: {
	full?: true
	app: IAugmentedApp
}) => {
	const productURL = `https://store.steampowered.com/app/${id}/`
	return (
		<div className={$container}>
			<div className={$cover}>
				<a href={productURL} target="_blank" title="Go to product page">
					<img src={cover} alt={name} />
				</a>
			</div>
			<div className={$info}>
				<div className={$name}>{name}</div>
				<div className={$section}>
					<div className={$left} title="Total playtime in hours">
						<IcoTime />
						<div className={$time}>{totalPlaytime}h</div>
					</div>
					<div className={$right}>
						{flags.includes('m') && (
							<IcoMultiplayer style={{ color: '#007cff', fontSize: '.8em' }} />
						)}
						{flags.includes('c') && (
							<IcoCoop style={{ color: '#d575d6', fontSize: '1.2em' }} />
						)}
					</div>
				</div>
				{full && (
					<div className={$section}>
						{Boolean(owners.length) && (
							<div className={$left}>
								<Party members={owners} title="Owners" />
							</div>
						)}
						{Boolean(buyers.length) && (
							<div className={$right}>
								<Party members={buyers} title="Who don't have" />
								<ButtonBuy
									title="Buy"
									onClick={() => window.open(productURL, '_blank')}
									style={{ color: '#428815' }}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

const Party = ({ members, title }: { members: IProfile[]; title: string }) => (
	<div className={$party}>
		{members.map(({ id, avatar }) => (
			<div
				key={id}
				className={$avatar}
				style={{ backgroundImage: `url(${avatar})` }}
				title={title}
			/>
		))}
	</div>
)

const $container = style({
	display: 'flex',
	flexDirection: 'column',
	background: '#fff',
	borderRadius: '0.5em',
	boxShadow: '0 0 10px rgba(123, 28, 9, 0.3)',
	overflow: 'hidden',
})

const $info = style({
	flexGrow: 1,
	display: 'flex',
	flexDirection: 'column',
	padding: '.3em',
})

const $name = style({
	flexGrow: 1,
	fontSize: '1.1em',
	marginBottom: '.3em',
	wordBreak: 'break-all',
})

const $section = style({
	display: 'flex',
	alignItems: 'center',
})

const $cover = style({
	backgroundColor: '#ffe4b6',
	lineHeight: 0,
})

const $left = style({
	display: 'flex',
	alignItems: 'center',
})

const $right = style({
	display: 'flex',
	alignItems: 'center',
	marginLeft: 'auto',
})

const $party = style({
	display: 'flex',
})

const $avatar = style({
	width: '1.5em',
	height: '1.5em',
	borderRadius: '50%',
	backgroundSize: 'cover',
	$nest: {
		'& + &': {
			marginLeft: '-.7em',
		},
	},
})

const $time = style({
	fontSize: '0.9em',
	color: '#a0a0a0',
	marginLeft: '0.3em',
	fontWeight: 700,
	lineHeight: 1.4,
})
