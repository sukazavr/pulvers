export namespace SteamAPI {
	export interface IProfile {
		steamid: string
		communityvisibilitystate: number
		profilestate: number
		personaname: string
		lastlogoff: number
		commentpermission: number
		profileurl: string
		avatar: string
		avatarmedium: string
		avatarfull: string
		personastate: number
	}

	export interface IAppInfo {
		appid: number
		name: string
		playtime_forever: number
		img_icon_url: string
		img_logo_url: string
		has_community_visible_stats: boolean
	}
}
