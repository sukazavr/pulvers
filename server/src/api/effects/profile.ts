import { Effect, HttpError, HttpStatus } from '@marblejs/core'
import { mergeMap } from 'rxjs/operators'
import SteamID from 'steamid'
import { getUserLibrary } from '../../steam-api/get-user-library'
import { getUserProfile } from '../../steam-api/get-user-profile'
import { parseVanityURL } from '../../steam-api/parse-vanity-url'
import { API } from '../typesAPI'

export const profileEffect$: Effect = (req$) =>
	req$.pipe(
		mergeMap(async (req) => {
			let steamID64: string | null = null
			const paramSteamID = req.params.steamID
			const matches = paramSteamID.match(REX_CUSTOM)
			if (matches) {
				steamID64 = await parseVanityURL(matches[1])
			} else {
				const steamID = new SteamID(paramSteamID)
				if (steamID.isValid()) {
					steamID64 = steamID.getSteamID64()
				}
			}
			if (steamID64) {
				return Promise.all([getUserProfile(steamID64), getUserLibrary(steamID64)]).then(
					([profile, library]) => ({ body: { profile, library } as API.IProfileEffect })
				)
			} else {
				throw new HttpError("SteamID isn't valid", HttpStatus.BAD_REQUEST)
			}
		})
	)

const REX_CUSTOM = /^name:([a-zA-Z0-9_-]+)$/
