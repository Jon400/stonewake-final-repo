/** An Authorization header as scheme and value. */
export interface AuthHeader {
  scheme: string
  value: string
}

/** Well-formed `swk_live_` key that Stonewake does not know. */
export function buildUnknownKey(): AuthHeader {
  return { scheme: 'Bearer', value: 'swk_live_invalid000000000000000000000000' }
}

/** Key that is not in the `swk_live_` format. */
export function buildMalformedKey(): AuthHeader {
  return { scheme: 'Bearer', value: 'not-a-key' }
}

/** Valid key value sent with the wrong `Token` scheme. */
export function buildTokenSchemeKey(validKey: string): AuthHeader {
  return { scheme: 'Token', value: validKey }
}

/** Basic scheme with a value that is not a key. */
export function buildBasicSchemeKey(): AuthHeader {
  return { scheme: 'Basic', value: 'abc' }
}
