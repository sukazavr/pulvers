export const getSteamID = (input: string): string | null => {
	let result: string | null = null
	const val = input.trim()
	if (val) {
		checksSeries.some((check) => {
			result = check(val)
			return result !== null
		})
	}
	return result
}

const S64_SBASE = 1197960265728
const S64_SBASE_PREFIX = 7656
const MAX_VALUE = 68719476736
const REX_SID32 = /^STEAM_[0-1]:([0-1]):([0-9]+)$/
const REX_SID64 = /^7656[0-9]+$/
const REX_SID3 = /^\[U:1:([0-9]+)\]$/
const REX_S32 = /^(-?[0-9]+)$/
const REX_RAW = /^[0-9]+$/
const REX_NICKNAME = /^[a-zA-Z0-9_-]+$/
const REX_PROFILE_URL = /^(?:https?:\/\/)?(?:www.)?steamcommunity.com\/profiles\/([0-9]+)\/*$/
const REX_VANITY_URL = /^(?:https?:\/\/)?(?:www.)?steamcommunity.com\/id\/([a-zA-Z0-9_-]+)\/*$/

const fromSID32 = (input: string) => {
	// validate STEAM_0/1:y:zzzzzz
	const matches = input.match(REX_SID32)
	if (!matches) {
		return null
	}
	// convert to raw.
	const raw = parseInt(matches[2]) * 2 + parseInt(matches[1])
	return toSID64(raw)
}

const fromSID64 = (input: string) => {
	// allow digits only
	if (!input.match(REX_SID64)) {
		return null
	}
	// convert to raw (subtract base)
	const raw = parseInt(input.substring(4)) - S64_SBASE
	// sanity range check.
	if (raw < 0 || raw > MAX_VALUE) {
		return null
	}
	return toSID64(raw)
}

const fromSID3 = (input: string) => {
	// validate [U:1:xxxxxx]
	const matches = input.match(REX_SID3)
	if (!matches) {
		return null
	}
	const raw = parseInt(matches[1])
	// sanity range check.
	if (raw > MAX_VALUE) {
		return null
	}
	return toSID64(raw)
}

const fromS32 = (input: string) => {
	// validate signed 32-bit format
	if (!input.match(REX_S32)) {
		return null
	}
	let raw = parseInt(input)
	// 32-bit range check
	if (raw > 2147483647 || raw < -2147483648) {
		return null
	}
	if (raw < 0) raw += 4294967296
	return toSID64(raw)
}

const fromRaw = (input: string) => {
	// validate digits only
	if (!input.match(REX_RAW)) {
		return null
	}
	const raw = parseInt(input)
	// sanity range check
	if (raw > MAX_VALUE) {
		return null
	}
	return toSID64(raw)
}

const fromNickname = (input: string) => {
	const matches = input.match(REX_NICKNAME)
	return matches ? `name:${input}` : null
}

const fromProfileURL = (input: string) => {
	const matches = input.match(REX_PROFILE_URL)
	return matches ? fromSID64(matches[1]) : null
}

const fromVanityURL = (input: string) => {
	const matches = input.match(REX_VANITY_URL)
	return matches ? `name:${matches[1]}` : null
}

const toSID64 = (raw: number) => `${S64_SBASE_PREFIX}${S64_SBASE + raw}`

const checksSeries = [
	fromSID32,
	fromSID64,
	fromSID3,
	fromNickname,
	fromProfileURL,
	fromVanityURL,
	fromS32,
	fromRaw,
]
