import { fs, ShellContext } from 'foy'
import * as paths from './paths'

export const taskDev = async (ctx: ShellContext) => {
	const packageJson = await fs.readJson(paths.packageJson)
	await Promise.all([
		ctx.cd('server').exec('nodemon --watch . --ext ts --exec ts-node src/index.ts'),
		ctx.exec(
			`webpack-dev-server ${packOptions({
				config: `"${paths.webpackDev}"`,
				'env.mode': 'development',
				'env.version': packageJson.version,
			})}`
		),
	])
}

const packOptions = (options: { [o: string]: any }) =>
	Object.entries(options)
		.map(([key, val]) => `--${key} ${val}`)
		.join(' ')
