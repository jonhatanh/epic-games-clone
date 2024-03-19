// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'
import { redirect } from 'react-router-dom'
import {
  getApiURL,
  getCurrentFilters,
  parseApiUrlPrevNext,
  getBasicApiCall
} from '../../../../../utils/helpersApi'

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
  const resGenre = await fetch(genreApiUrl)
  if (resGenre.status >= 400) {
    throw new Response('Error fetching data :(', { status: 500 })
  }
  const genre = await resGenre.json()

  // const res = await fetch(apiURL.href)
  // if (res.status >= 400) {
  //   throw new Response('Error fetching data :(', { status: 500 })
  // }
  // const games = parseApiUrlPrevNext(await res.json(), reqURL)

  const games = parseApiUrlPrevNext(
    await Promise.resolve(gamesJson),
    new URL(reqURL.href)
  )

  const currentFilters = getCurrentFilters(reqURL, genres)

  return {
    games,
    genre,
    currentFilters
  }
}
