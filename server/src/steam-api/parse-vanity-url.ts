import fetch from 'node-fetch'
import { getSetting } from '../supply/datastore'

export const parseVanityURL = async (name: string): Promise<string | null> => {
	const key = await getSetting('STEAM_API_KEY')
	const {
		response: { steamid },
	} = await fetch(`${vanityURL}/?key=${key}&vanityurl=${name}`).then<{
		response: { steamid?: string }
	}>((response) => response.json())
	return steamid || null
}

const vanityURL = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001'
