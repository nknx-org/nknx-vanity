const moment = require('moment')
const bs58 = require('bs58')

function getAddressSample(name, isSuffix) {
  const addressTemplate = 'XXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg'
  const addressSlice = addressTemplate.slice(name.length)
  let address = 'NKN'

  if (!isSuffix) {
    address += name
    address += addressSlice
  } else {
    address += addressSlice
    address += name
  }

  return address
}

function isValidName(name, isSuffix) {
  const minHex = '02b825000000000000000000000000000000000000000000000000'
  const maxHex = '02b825ffffffffffffffffffffffffffffffffffffffffffffffff'
  const address = getAddressSample(name, isSuffix)
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
  getVanityOutcomes,
  getAddressSample
}

export default nknVanity
