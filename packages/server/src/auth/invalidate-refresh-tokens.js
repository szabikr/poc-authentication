const {
  readRefreshToken,
  setRefreshTokenReplacedBy,
} = require('./refresh-tokens-collection')

const INVALID_TOKEN_VALUE = 'INVALID_TOKEN_VALUE'

async function invalidateRefreshTokenChain(refreshToken) {
  if (process.env.FEATURE_FLAG__INVALIDATE_REFRESH_TOKEN_CHAIN === 'OFF') {
    console.log('INVALIDATE_REFRESH_TOKEN_CHAIN feature is OFF')
    return
  }

  let rt = refreshToken
  while (rt.replacedBy !== undefined || rt.replacedBy !== INVALID_TOKEN_VALUE) {
    console.log('refresh token chain piece:', rt.value)

    // eslint-disable-next-line no-await-in-loop
    const result = await readRefreshToken(rt.replacedBy)
    if (result.hasError) {
      console.error(
        'something went wrong while invalidating refresh tokens, readRefreshToken returned with error',
      )
      return
    }

    rt = result.document
    if (!rt) {
      console.error(
        'something went wrong while invalidating refresh tokens, rt was not defined',
      )
      return
    }
  }

  console.log('invalidating token:', rt.value)
  setRefreshTokenReplacedBy(rt.value, INVALID_TOKEN_VALUE)
}

module.exports = {
  invalidateRefreshTokenChain,
}
