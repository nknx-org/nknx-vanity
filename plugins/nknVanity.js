const moment = require('moment')
const bs58 = require('bs58')

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

const nknVanity = {
  isValidName,
  getVanityEtc,
  getVanityOutcomes
}

export default nknVanity
