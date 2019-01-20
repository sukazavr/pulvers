import fetch from 'node-fetch'
import { API } from '../api/typesAPI'
import { getAppsFlags, getSetting, saveAppFlags } from '../supply/datastore'
import { SteamAPI } from './typesSteamAPI'

export const getUserLibrary = async (steamID: string): Promise<API.ILibrary | null> => {
	const key = await getSetting('STEAM_API_KEY')
	const {
		response: { game_count: count, games: rawApps },
	} = await fetch(`${playerLibrary}/?key=${key}&steamid=${steamID}&include_appinfo=1`).then<{
		response: { game_count?: number; games?: SteamAPI.IAppInfo[] }
	}>((response) => response.json())
	if (count && rawApps) {
		const flagsMap = await getAppsFlags(rawApps)
		if (Object.keys(flagsMap).length !== rawApps.length) {
			const appsWithoutFlags = rawApps.filter((app) => !flagsMap[app.appid])
			const newFlags = await populateWithFlags(appsWithoutFlags)
			Object.assign(flagsMap, newFlags)
		}
		const multiplayerApps = rawApps.filter(({ appid }) => Boolean(flagsMap[appid]))
		const apps = multiplayerApps.map((app) => formatApp(app, flagsMap[app.appid]))
		return { count, apps }
	} else {
		return null
	}
}

const playerLibrary = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001'
const regTag = new RegExp('<a[^>]*class="app_tag"[^>]*>([^<]*)</a>', 'gi')
const tagMap: { [tagName: string]: string | undefined } = {
	Multiplayer: 'm',
	'Co-op': 'c',
	'Online Co-Op': 'c',
}

const parseAppFlags = (appID: number) =>
	fetch(`https://store.steampowered.com/app/${appID}`)
		.then((response) => response.text())
		.then((html) => {
			let m
			const tags = new Set()
			while ((m = regTag.exec(html)) !== null) {
				const tag = tagMap[m[1].trim()]
				if (tag) {
					tags.add(tag)
				}
			}
			return Array.from(tags).join('')
		})

const populateWithFlags = (apps: SteamAPI.IAppInfo[]) =>
	Promise.all(
		apps.map(async (app) => {
			const appID = app.appid
			const flags = await parseAppFlags(appID)
			saveAppFlags(appID, flags) // Don't wait for write operation
			return {
				appID,
				flags,
			}
		})
	).then((apps) =>
		apps.reduce<{ [appID: string]: string }>((acc, appData) => {
			acc[appData.appID] = appData.flags
			return acc
		}, {})
	)

const formatApp = (app: SteamAPI.IAppInfo, flags: string): API.IApp => ({
	id: app.appid,
	flags,
	name: app.name,
	playtime: app.playtime_forever,
	cover: app.img_logo_url,
})
