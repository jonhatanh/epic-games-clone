import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'
import { redirect } from 'react-router-dom'
import {
  getApiURL,
  getCurrentFilters,
  parseApiUrlPrevNext,
  getBasicApiCall,
  parseGamesInApiResponse
} from '@/utils/helpersApi'

export async function loader ({ request, params: { genreSlug } }) {
  const reqURL = new URL(request.url)
  const newPage = reqURL.searchParams.get('page')
  if (newPage === null) {
    reqURL.searchParams.set('page', 1)
    return redirect(reqURL.href)
  }

  const apiURL = getApiURL(reqURL, newPage, `&genres=${genreSlug}`)

  const genres = await Promise.resolve(genresJson)
  const genreId = genres.results.find((genre) => genre.slug === genreSlug)?.id
  const genreApiUrl = getBasicApiCall(`/genres/${genreId}`)
  const resGenre = await fetch(genreApiUrl, { mode: 'cors' })
  if (resGenre.status >= 400) {
    throw new Response('Error fetching data :(', { status: 500 })
  }
  const genre = await resGenre.json()

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
    genre,
    currentFilters
  }
}
