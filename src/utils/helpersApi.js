import { API_KEY_PARAM, API_URL, DEFAULT_QUERY_STRING, FILTERS_ID, FILTERS_ITEMS_ORDER_BY } from '../constans'
import { randomPriceString } from './helpers'

export function restMonths (date, months) {
  return new Date(date.setMonth(date.getMonth() - months))
}
export function getStringDate (date) {
  return date.toISOString().split('T')[0]
}

export function parseGamesInApiResponse (response) {
  response.results = response.results.map((game) => {
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
      parent_platforms: game.parent_platforms,
      price: randomPriceString()
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
    parent_platforms: game.parent_platforms,
    publishers: game.publishers,
    price: randomPriceString()
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

export function parseApiUrlPrevNext (response, actualURL) {
  const currentPage = Number(actualURL.searchParams.get('page'))
  if (response.next) {
    actualURL.searchParams.set('page', currentPage + 1)
    response.next = actualURL.href
  }
  if (response.previous) {
    actualURL.searchParams.set('page', currentPage - 1)
    response.previous = actualURL.href
  }
  return response
}

export function getApiURL (currentRequestURL, currentPage, extraParams = '') {
  const apiURL = new URL(
    `${API_URL}/games${DEFAULT_QUERY_STRING}&page_size=20&${currentRequestURL.search.substring(
      1
    )}${extraParams}`
  )
  apiURL.searchParams.set('page', currentPage)
  return apiURL
}

export function getBasicApiCall (endPoint) {
  return `${API_URL}${endPoint}?${API_KEY_PARAM}`
}

export function getCurrentFilters (currentRequestURL, genres = []) {
  const currentFilters = {}
  if (genres && currentRequestURL.searchParams.get('genres')) {
    currentFilters.genres = currentRequestURL.searchParams
      .get('genres')
      .split(',')
      .map((genreSlug) => {
        const genre = genres.results.find((genre) => genre.slug === genreSlug)
        return { ...genre, filterId: FILTERS_ID.genre }
      })
  }
  if (currentRequestURL.searchParams.get('ordering')) {
    const orderBy = currentRequestURL.searchParams.get('ordering')
    const descendingActivated = orderBy.substring(0, 1) === '-'
    const orderByString = descendingActivated ? orderBy.substring(1) : orderBy
    currentFilters.orderBy = FILTERS_ITEMS_ORDER_BY.find(
      (item) => item.slug === orderByString
    )
    currentFilters.descending = descendingActivated
  }
  if (currentRequestURL.searchParams.get('dates')) {
    const [from, to] = currentRequestURL.searchParams.get('dates').split(',')
    currentFilters.dates = { from: from ?? '', to: to ?? '' }
  }
  if (Object.keys(currentFilters).length > 1) {
    currentFilters.page = currentRequestURL.searchParams.get('page')
  }
  return currentFilters
}
