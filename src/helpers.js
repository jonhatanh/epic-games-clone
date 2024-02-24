export function randomPrice (min = 200, max = 1500) {
  return Math.random() * (max - min) + min
}

export function parsePrice (price) {
  let hundreds = (price % 1000).toFixed(2)
  const haveHundred = Math.floor(hundreds / 100)
  const thousands = Math.floor(price / 1000)
  if (!haveHundred) {
    hundreds = '0' + hundreds
  }
  return thousands
    ? `MX$${thousands},${hundreds}`
    : `MX$${hundreds}`
}

export function randomPriceString (min = 200, max = 1500) {
  return parsePrice(randomPrice(min, max))
}
