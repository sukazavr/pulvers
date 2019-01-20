export interface IOwn {
	[appID: string]: {
		playtime: number
	}
}

export interface IProfile {
	id: string
	url: string
	name: string
	avatar: string
	own: IOwn
	appsCount: number
	appsHidden: boolean
}

export const defaultProfile: IProfile = {
	id: '',
	url: '',
	name: '',
	avatar: '',
	own: {},
	appsCount: 0,
	appsHidden: false,
}

export interface IApp {
	id: number
	name: string
	flags: string
	cover: string
}

export const defaultApp: IApp = {
	id: 999999,
	name: '',
	flags: '',
	cover: '',
}

export interface IResponseError {
	error: {
		message: string
		status: number
	}
}
