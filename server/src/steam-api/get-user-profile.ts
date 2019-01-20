import fetch from 'node-fetch'
import { API } from '../api/typesAPI'
import { getSetting } from '../supply/datastore'
import { SteamAPI } from './typesSteamAPI'

export const getUserProfile = async (steamID: string): Promise<API.IProfile> => {
	const key = await getSetting('STEAM_API_KEY')
	const {
		response: {
			players: [profile],
		},
	} = await fetch(`${playerSummaries}/?key=${key}&steamids=${steamID}`).then<{
		response: { players: SteamAPI.IProfile[] }
	}>((response) => response.json())
	return {
		id: steamID,
		url: profile.profileurl,
		avatar: profile.avatarfull,
		name: profile.personaname,
	}
}

const playerSummaries = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002'
