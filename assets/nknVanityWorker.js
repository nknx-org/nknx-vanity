const nknWallet = require('nkn-wallet')
const bs58 = require('bs58')
const step = 100

function isValidName(name) {
  const addressTemplate = 'XXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg'
  const minHex = '02b825000000000000000000000000000000000000000000000000'
  const maxHex = '02b825ffffffffffffffffffffffffffffffffffffffffffffffff'

  let address = 'NKN' + name
  address += addressTemplate.slice(name.length)

  let bytes = 0

  try {
    bytes = bs58.decode(address)
  } catch (err) {
    return false
  }

  const addressHex = bytes.toString('hex')

  const minInt = parseInt(minHex, 16)
  const maxInt = parseInt(maxHex, 16)
  const addressInt = parseInt(addressHex, 16)

  return addressInt >= minInt && addressInt <= maxInt
}

function getRandomWallet(password) {
  if (!password) {
    throw new Error('You have not entered password')
  }
  const wallet = nknWallet.newWallet(password)
  return wallet
}

function isValidVanityWallet(address, name) {
  if (!isValidName(name)) {
    throw new Error(
      'Your name contains one of banned symbols (0, o, l, I) or is more than 33 char length'
    )
  }

  const regexp = new RegExp(`NKN${name}`)

  if (String(address).match(regexp) === null) {
    return false
  }
  return true
}

function getVanityWallet(password, name, cb) {
  let attempts = 1

  if (!name) {
    throw new Error('You have not entered name')
  }

  if (!password) {
    throw new Error('You have not entered password')
  }

  let wallet = getRandomWallet(password)

  while (!isValidVanityWallet(wallet.address, name)) {
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
    getVanityWallet(input.password, input.name, (message) =>
      postMessage(message)
    )
  } catch (err) {
    self.postMessage({ error: err.toString() })
  }
}

export default onmessage
