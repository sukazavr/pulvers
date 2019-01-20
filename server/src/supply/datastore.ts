import { Datastore } from '@google-cloud/datastore'
import { SteamAPI } from '../steam-api/typesSteamAPI'

const datastore = new Datastore({
	projectId: 'pulvers',
})

const KEY = datastore.KEY
const SETTINGS = 'Settings'
const NOT_SET = 'NOT SET'

const settingsCache: { [name: string]: any } = {}

export const getSetting = async (name: string) => {
	let value = settingsCache[name]
	if (value === undefined || value === NOT_SET) {
		const key = datastore.key([SETTINGS, name.toUpperCase()])
		const [result] = await datastore.get(key)
		if (result) {
			value = settingsCache[name] = result.value
		} else {
			await datastore.save({
				key,
				data: {
					value: NOT_SET,
				},
			})
			value = NOT_SET
		}
	}
	return value
}

const APPS = 'Apps'

export const saveAppFlags = async (appID: number, flags: string) => {
	const key = datastore.key([APPS, appID])
	await datastore.save({
		key,
		data: {
			flags,
		},
	})
}

const CHUNK_SIZE = 1000
export const getAppsFlags = async (apps: SteamAPI.IAppInfo[]) => {
	const appsCount = apps.length
	if (appsCount > CHUNK_SIZE) {
		const chunks: SteamAPI.IAppInfo[][] = []
		for (let i = 0; i < appsCount; i += CHUNK_SIZE) {
			chunks.push(apps.slice(i, i + CHUNK_SIZE))
		}
		return await Promise.all(chunks.map(pullFlags)).then((bunch) =>
			bunch.reduce((acc, c) => {
				Object.assign(acc, c)
				return acc
			}, {})
		)
	} else {
		return await pullFlags(apps)
	}
}

const pullFlags = async (apps: SteamAPI.IAppInfo[]) => {
	const [res] = (await datastore.get(apps.map(({ appid }) => datastore.key([APPS, appid])))) as any
	return (res as any[]).reduce<{ [appID: string]: string }>((acc, appData) => {
		acc[appData[KEY].id] = appData.flags
		return acc
	}, {})
}
