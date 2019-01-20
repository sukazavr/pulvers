import { fs, ShellContext } from 'foy'
import { taskBuildClient } from './task.build.client'
import { taskBuildServer } from './task.build.server'
import * as paths from './paths'
import path from 'path'

export const taskRelease = async (ctx: ShellContext & { options: { i?: true } }) => {
	if (ctx.options.i) {
		await ctx.exec('standard-version --no-verify')
	}
	await fs.rmrf(paths.dist)
	await Promise.all([
		taskBuildServer(ctx),
		taskBuildClient(ctx),
		fs.copy(paths.server, paths.dist, {
			skip: (path) => skipServerFiles.includes(path),
		}),
	])
	// await ctx.cd('dist').exec('gcloud app deploy')
}

const skipServerFiles = [
	path.join(paths.server, 'src'),
	path.join(paths.server, 'node_modules'),
	path.join(paths.server, 'tsconfig.json'),
]
