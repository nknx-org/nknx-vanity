const nknWallet = require('nkn-wallet')
const moment = require('moment')

const step = 500

function isValidName(name) {
  const bannedSymbols = ['0', 'o', 'O', 'l', 'I']
  const bannedRegexp = new RegExp(bannedSymbols.join('|'))
  if (name.match(bannedRegexp)) {
    return false
  }
  return true
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
    throw new Error('Your name contains one of banned symbols (0, o, l, I)')
  }

  const regexp = new RegExp(`NKN${name}`)

  if (String(address).match(regexp) === null) {
    return false
  }
  return true
}

function getVanityWalletSpeed(threads) {
  const startTime = moment()
  const generatedWallets = []
  const duration = 5 // secs
  const endTime = moment(startTime).add(duration, 'seconds')

  let vanitySpeed = 0

  while (!moment().isAfter(endTime)) {
    const wallet = nknWallet.newWallet('password')
    generatedWallets.push(wallet)
  }

  vanitySpeed = Number((generatedWallets.length / duration) * threads).toFixed(
    2
  ) // per second

  return vanitySpeed
}

function getVanityOutcomes(name) {
  const chance = 58 // all allowed base 58 symbols
  const totalOutcomes = chance ** name.length
  return totalOutcomes
}

function getVanityEtc(vanitySpeed, name, currentCount) {
  const totalOutcomes = getVanityOutcomes(name)
  const approxVanityTime = (totalOutcomes - currentCount) / vanitySpeed
  const etc = moment()
    .add(approxVanityTime, 'seconds')
    .fromNow()

  return etc
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
      cb(attempts)

      attempts = 0
    }
    wallet = getRandomWallet(password)
    attempts++
  }

  cb(wallet.toJSON())
}

function onmessage(event) {
  const input = event.data
  try {
    getVanityWallet(input.hex, input.checksum, input.suffix, (message) =>
      postMessage(message)
    )
  } catch (err) {
    self.postMessage({ error: err.toString() })
  }
}

const nknVanity = {
  isValidName,
  getVanityWallet,
  getVanityWalletSpeed,
  getVanityEtc,
  getVanityOutcomes,
  onmessage
}

export default nknVanity
