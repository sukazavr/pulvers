import { Effect, HttpError, HttpStatus } from '@marblejs/core'
import * as FileHelper from '@marblejs/core/dist/+internal/files'
import { ContentType } from '@marblejs/core/dist/+internal/http'
import { iif, of, throwError } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'

const publicDir = 'public'
const headers = { 'Content-Type': ContentType.TEXT_HTML }
const ENTRY = of('index.html').pipe(
	mergeMap(FileHelper.readFile(publicDir)),
	map((body) => ({ body, headers }))
)
const INTERNAL_SERVER_ERROR = throwError(
	new HttpError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
)

export const rootEffect$: Effect = (req$) =>
	req$.pipe(
		mergeMap((req) =>
			of(req.params.dir).pipe(
				mergeMap(FileHelper.readFile(publicDir)),
				map((body) => ({ body })),
				catchError((error) => iif(() => error.code === 'ENOENT', ENTRY, INTERNAL_SERVER_ERROR))
			)
		)
	)
