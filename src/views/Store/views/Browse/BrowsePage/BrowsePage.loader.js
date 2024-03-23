import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'
import { redirect } from 'react-router-dom'
import {
  getApiURL,
  getCurrentFilters,
  parseApiUrlPrevNext,
  parseGamesInApiResponse
} from '@/utils/helpersApi'

export async function browseLoader ({ request }) {
  const reqURL = new URL(request.url)
  const newPage = reqURL.searchParams.get('page')
  // console.log(request.url, newPage);
  if (newPage === null) {
    reqURL.searchParams.set('page', 1)
    return redirect(reqURL.href)
  }

  const apiURL = getApiURL(reqURL, newPage)

  const genres = await Promise.resolve(genresJson)

  let games = []
  if (import.meta.env.PROD) {
    const res = await fetch(apiURL.href, { mode: 'cors' })
    if (res.status >= 400) {
      throw new Response('Error fetching data :(', { status: 500 })
    }
    games = parseApiUrlPrevNext(await res.json(), reqURL)
  } else {
    games = parseGamesInApiResponse(
      parseApiUrlPrevNext(
        await Promise.resolve(gamesJson),
        new URL(reqURL.href)
      )
    )
  }

  const currentFilters = getCurrentFilters(reqURL, genres)

  return {
    games,
    genres,
    currentFilters
  }
}
