/**
 * Generates a hashcode from a string
 * Taken from http://stackoverflow.com/a/7616484
 * @param {string} str - str used to generate the unique hash code
 */
export function generateStringHash(str) {
  let hash = 0
  let iterator
  let char
  const length = str.length

  if (length === 0) {
    return hash
  }

  for (iterator = 0; iterator < length; ++iterator) {
    char = str.charCodeAt(iterator)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }

  return hash.toString(36)
}

export function generateObjectHash(obj){
  let str = JSON.stringify(obj)
  return generateStringHash(str)
}
