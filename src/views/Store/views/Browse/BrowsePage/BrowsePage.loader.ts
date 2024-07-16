import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'
import { redirect } from 'react-router-dom'
import {
  getApiURL,
  getCurrentFilters,
  parseApiUrlPrevNext,
  parseGamesInApiResponse
} from '@/utils/helpersApi'
import { GenreApiType } from '@/types'
import { GameApiResponse, GamesApiResponse, GamesTypeWithApiInfo } from '@/types/rawApiResponses'

export async function browseLoader({ request }: { request: Request }) {
  const reqURL = new URL(request.url)
  const newPage = reqURL.searchParams.get('page')
  // console.log(request.url, newPage);
  if (newPage === null) {
    reqURL.searchParams.set('page', '1')
    return redirect(reqURL.href)
  }

  const apiURL = getApiURL(reqURL, newPage)

  const genres = await Promise.resolve(genresJson) as GenreApiType

  let games: GamesApiResponse | GamesTypeWithApiInfo
  if (import.meta.env.PROD) {
    const res = await fetch(apiURL.href, { mode: 'cors' })
    if (res.status >= 400) {
      throw new Response('Error fetching data :(', { status: 500 })
    }
    games = parseApiUrlPrevNext<GameApiResponse>(await res.json(), reqURL)
  } else {
    games = parseGamesInApiResponse(
      parseApiUrlPrevNext(
        await Promise.resolve(gamesJson) as GamesApiResponse,
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
