// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'
import { redirect } from 'react-router-dom'
import {
  getApiURL,
  getCurrentFilters,
  parseApiUrlPrevNext
} from '../../../../../utils/helpersApi'

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
    genres,
    currentFilters
  }
}
