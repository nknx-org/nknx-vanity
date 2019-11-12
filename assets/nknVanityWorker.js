const nknWallet = require('nkn-wallet')
const { isValidName } = require('@/plugins/nknVanity').default

const step = 100

function getRandomWallet(password) {
  if (!password) {
    throw new Error('You have not entered password')
  }
  const wallet = nknWallet.newWallet(password)
  return wallet
}

function isValidVanityWallet(address, name, isSuffix) {
  if (!isValidName(name, isSuffix)) {
    throw new Error(
      'Your name have non-base58 character or is more than 33 char length'
    )
  }

  let regexp = ''

  if (!isSuffix) {
    regexp = new RegExp(`NKN${name}`)
  } else {
    regexp = new RegExp(`${name}` + '$')
  }

  if (String(address).match(regexp) === null) {
    return false
  }
  return true
}

function getVanityWallet(password, name, isSuffix, cb) {
  let attempts = 1

  if (!name) {
    throw new Error('You have not entered name')
  }

  if (!password) {
    throw new Error('You have not entered password')
  }

  let wallet = getRandomWallet(password)

  while (!isValidVanityWallet(wallet.address, name, isSuffix)) {
    if (attempts >= step) {
      // eslint-disable-next-line standard/no-callback-literal
      cb({ attempts })
      attempts = 0
    }
    attempts += 1

    wallet = getRandomWallet(password)
  }
  // eslint-disable-next-line standard/no-callback-literal
  cb({ wallet: wallet.toJSON(), attempts })
}

onmessage = function(event) {
  const input = event.data

  try {
    getVanityWallet(input.password, input.name, input.suffix, (message) =>
      postMessage(message)
    )
  } catch (err) {
    self.postMessage({ error: err.toString() })
  }
}

export default onmessage
