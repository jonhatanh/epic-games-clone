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

export function restMonths (date, months) {
  return new Date(date.setMonth(date.getMonth() - months))
}
export function getStringDate (date) {
  return date.toISOString().split('T')[0]
}

export function parseGamesInApiResponse (response) {
  response.results = response.results.map(game => {
    return {
      id: game.id,
      slug: game.slug,
      name: game.name,
      released: game.released,
      genres: game.genres,
      tags: game.tags,
      metacritic: game.metacritic,
      rating: game.rating,
      background_image: game.background_image,
      parent_platforms: game.parent_platforms
    }
  })
  return response
}

export function parseSingleGameInApiResponse (game) {
  return {
    id: game.id,
    slug: game.slug,
    name: game.name,
    description: game.description,
    released: game.released,
    genres: game.genres,
    tags: game.tags,
    metacritic: game.metacritic,
    rating: game.rating,
    background_image: game.background_image,
    parent_platforms: game.parent_platforms
  }
}

export async function makeApiCalls (urls) {
  const promisesRes = await Promise.all(urls.map((url) => fetch(url)))

  const jsonPromises = promisesRes.map((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Response('Error Fetching Data :(', { status: 500 })
  })
  return await Promise.all(jsonPromises)
}
