import path from 'path'

export const root = path.resolve(__dirname, '..')

export const packageJson = path.resolve(root, 'package.json')
export const tsconfigDev = path.resolve(root, 'tsconfig.dev.json')

export const dist = path.resolve(root, 'dist')
export const distPublic = path.resolve(dist, 'public')

export const config = path.resolve(root, 'config')
export const webpackDev = path.resolve(config, 'webpack.dev.ts')
export const webpackProd = path.resolve(config, 'webpack.prod.ts')

export const assets = path.resolve(root, 'assets')
export const assetsPublic = path.resolve(assets, 'public')
export const assetsIndex = path.resolve(assets, 'index.html')

export const client = path.resolve(root, 'client')
export const clientFirstInteraction = path.resolve(client, '@first-interaction')
export const clientPrerender = path.resolve(clientFirstInteraction, 'prerender.ts')

export const server = path.resolve(root, 'server')
export const serverIndex = path.resolve(server, 'src', 'index.ts')
