import { ShellContext } from 'foy'
import * as paths from './paths'

export const taskBuildServer = async (ctx: ShellContext) => {
	await ctx.exec(`tsc -p "${paths.server}"`)
}
