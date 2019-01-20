export namespace API {
	export interface IProfile {
		id: string
		url: string
		name: string
		avatar: string
	}

	export interface IApp {
		id: number
		name: string
		flags: string
		cover: string
		playtime: number
	}

	export interface ILibrary {
		count: number
		apps: IApp[]
	}

	export interface IProfileEffect {
		profile: IProfile
		library: ILibrary | null
	}
}
