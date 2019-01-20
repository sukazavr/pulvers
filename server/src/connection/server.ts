import { createServer, IncomingMessage, ServerResponse } from 'http'

export namespace Server {
	const PORT = process.env.PORT || 8080

	const onListen = () => {
		console.info(`[server] running http://localhost:${PORT}/`)
	}

	const onClose = () => {
		console.info('[server] stopped')
	}

	const onError = (error: Error) => {
		console.error('[server] errored', error.message)
	}

	export const create = async (app: (req: IncomingMessage, res: ServerResponse) => void) =>
		createServer(app)
			.listen(PORT, onListen)
			.on('close', onClose)
			.on('error', onError)
}
