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
  return thousands ? `MX$${thousands},${hundreds}` : `MX$${hundreds}`
}

export function randomPriceString (min = 200, max = 1500) {
  return parsePrice(randomPrice(min, max))
}

export function randomNumber (min = 1, max = 1000) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function returnCopies (game, qty = 1) {
  const copies = []
  for (let i = 1; i <= qty; i++) {
    copies.push({ ...game })
  }
  return copies
}
