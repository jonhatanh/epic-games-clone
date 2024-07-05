import { API_KEY_PARAM, API_URL, DEFAULT_QUERY_STRING, FilterOrderByItem, FILTERS_ID, FILTERS_ITEMS_ORDER_BY } from '../constans'
import { GenreApiResponse, GenreApiType } from '../types'
import {  GameDetailsApiResponse, GameDetailsType, GamesApiResponse, GamesTypeWithApiInfo, GameType } from '../types/rawApiResponses'
import { randomPrice, randomPriceString } from './helpers'

export function restMonths (date: Date, months: number) {
  return new Date(date.setMonth(date.getMonth() - months))
}
export function getStringDate (date: Date) {
  return date.toISOString().split('T')[0]
}

export function parseGamesInApiResponse (response: GamesApiResponse): GamesTypeWithApiInfo {
  const gameTypeCopy: GamesTypeWithApiInfo = {
    ...response,
    results: []
  }
  gameTypeCopy.results = response.results.map((game): GameType => {
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
      esrb_rating: game.esrb_rating,
      price: randomPriceString()
    }
  })
  return gameTypeCopy
}

export function parseSingleGameInApiResponse (game: GameDetailsApiResponse, priceNumber = false): GameDetailsType {
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
    esrb_rating: game.esrb_rating,
    price: priceNumber ? randomPrice() : randomPriceString()
  }
}

export async function makeApiCalls<T>(urls: string[]): Promise<T[]> {
  const promisesRes = await Promise.all(urls.map((url) => fetch(url, { mode: 'cors' })))

  const jsonPromises = promisesRes.map((res) => {
    if (res.ok) {
      return res.json() as Promise<T>
    }
    throw new Response('Error Fetching Data :(', { status: 500 })
  })
  return await Promise.all(jsonPromises)
}

export function parseApiUrlPrevNext<T>(response: ApiResponseTemplate<T>, actualURL: URL) {
  const currentPage = Number(actualURL.searchParams.get('page'))
  if (response.next) {
    actualURL.searchParams.set('page', String(currentPage + 1))
    response.next = actualURL.href
  }
  if (response.previous) {
    actualURL.searchParams.set('page', String(currentPage - 1))
    response.previous = actualURL.href
  }
  return response
}

export function getApiURL (currentRequestURL: URL, currentPage: string, extraParams = '') {
  const apiURL = new URL(
    `${API_URL}/games${DEFAULT_QUERY_STRING}&page_size=20&${currentRequestURL.search.substring(
      1
    )}${extraParams}`
  )
  apiURL.searchParams.set('page', currentPage)
  return apiURL
}

export function getBasicApiCall (endPoint: string) {
  return `${API_URL}${endPoint}?${API_KEY_PARAM}`
}


type GenreTypeWithFilter = GenreApiResponse & { filterId: number }
type FiltersType = {
  genres?: GenreTypeWithFilter[],
  orderBy?: FilterOrderByItem,
  descending?: boolean,
  dates?: { from: string, to: string },
  page?: string
}
export function getCurrentFilters (currentRequestURL: URL, genres?: GenreApiType) {
  const currentFilters : FiltersType = {}
  const requestParams = {
    genres: currentRequestURL.searchParams.get('genres'),
    ordering: currentRequestURL.searchParams.get('ordering'),
    dates: currentRequestURL.searchParams.get('dates')
  }
  if (genres && requestParams.genres) {
    currentFilters.genres = requestParams.genres
      .split(',')
      .map((genreSlug) => {
        const genre = genres.results.find((genre) => genre.slug === genreSlug)
        if (!genre) {
          throw new Error('Genre not found')
        }
        return { ...genre, filterId: FILTERS_ID.genre }
      })
  }
  if (requestParams.ordering) {
    const orderBy = requestParams.ordering
    const descendingActivated = orderBy.substring(0, 1) === '-'
    const orderByString = descendingActivated ? orderBy.substring(1) : orderBy
    currentFilters.orderBy = FILTERS_ITEMS_ORDER_BY.find(
      (item) => item.slug === orderByString
    )
    currentFilters.descending = descendingActivated
  }
  if (requestParams.dates) {
    const [from, to] = requestParams.dates.split(',')
    currentFilters.dates = { from: from ?? '', to: to ?? '' }
  }
  if (Object.keys(currentFilters).length > 1) {
    currentFilters.page = currentRequestURL.searchParams.get('page') ?? '1'
  }
  return currentFilters
}
