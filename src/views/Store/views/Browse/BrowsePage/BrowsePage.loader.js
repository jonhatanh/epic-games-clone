// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'
import { redirect } from 'react-router-dom'
import {
  API_URL,
  DEFAULT_QUERY_STRING,
  filterItemIds,
  orderByItems
} from '../../../../../constans'

function parseApiUrlPrevNext (response, actualURL) {
  const currentPage = Number(actualURL.searchParams.get('page'))
  if (response.next) {
    actualURL.searchParams.set('page', currentPage + 1)
    response.next = actualURL.href
    console.log('pip', actualURL, response)
  }
  if (response.previous) {
    actualURL.searchParams.set('page', currentPage - 1)
    response.previous = actualURL.href
  }
  return response
}
export async function browseLoader ({ request }) {
  console.log('popo', request)
  const reqURL = new URL(request.url)
  const newPage = reqURL.searchParams.get('page')
  if (newPage === null) {
    reqURL.searchParams.set('page', 1)
    return redirect(reqURL.href)
  }

  const apiURL = new URL(
    `${API_URL}/games${DEFAULT_QUERY_STRING}&page_size=20&${reqURL.search.substring(
      1
    )}`
  )
  apiURL.searchParams.set('page', newPage)

  const genres = await Promise.resolve(genresJson)
  const games = parseApiUrlPrevNext(await Promise.resolve(gamesJson), reqURL)

  const currentFilters = {}
  if (reqURL.searchParams.get('genres')) {
    currentFilters.genres = reqURL.searchParams
      .get('genres')
      .split(',')
      .map((genreSlug) => {
        const genre = genres.results.find((genre) => genre.slug === genreSlug)
        return { ...genre, filterId: filterItemIds.genre }
      })
  }
  if (reqURL.searchParams.get('ordering')) {
    const orderBy = reqURL.searchParams.get('ordering')
    const descendingActivated = orderBy.substring(0, 1) === '-'
    const orderByString = descendingActivated ? orderBy.substring(1) : orderBy
    console.log({ orderByItems })
    currentFilters.orderBy = orderByItems.find(item => item.slug === orderByString)
    currentFilters.descending = descendingActivated
  }
  if (reqURL.searchParams.get('dates')) {
    const [from, to] = reqURL.searchParams.get('dates').split(',')
    currentFilters.dates = { from: from ?? '', to: to ?? '' }
  }
  console.log('Filters', currentFilters)
  return {
    games,
    genres,
    currentFilters
  }
}
