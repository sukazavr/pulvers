import { IApp, IProfile } from '../@app/typesApp'

export interface IAugmentedApp {
	data: IApp
	extra: {
		totalPlaytime: number
		owners: IProfile[]
		buyers: IProfile[]
	}
}
