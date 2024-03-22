// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import bestGames from '@/utils/apiResponseSteam2.json'
import gamesILikeJson from '@/utils/apiGamesILikeResponse.json'
import { API_URL, DEFAULT_QUERY_STRING } from '@/constans.js'
import { randomNumber } from '@/utils/helpers'
import {
  restMonths,
  getStringDate,
  parseGamesInApiResponse,
  parseSingleGameInApiResponse,
  makeApiCalls
} from '@/utils/helpersApi'

export async function loader () {
  // const gamesResponse = await makeApiCalls([
  //   `${API_URL}/games${DEFAULT_QUERY_STRING}&dates=${getStringDate(
  //     restMonths(new Date(), 3)
  //   )},${getStringDate(new Date())}&page_size=6`,
  //   `${API_URL}/games${DEFAULT_QUERY_STRING}&dates=${getStringDate(
  //     restMonths(new Date(), 12)
  //   )},${getStringDate(new Date())}&page_size=15`,
  //   `${API_URL}/games${DEFAULT_QUERY_STRING}&ordering=-released&page_size=5`,
  //   `${API_URL}/games${DEFAULT_QUERY_STRING}&page=${randomNumber()}&page_size=10`
  // ])
  // return {
  //   heroGames: parseGamesInApiResponse(gamesResponse[0]).results,
  //   lastYear: parseGamesInApiResponse(gamesResponse[1]).results,
  //   newGames: parseGamesInApiResponse(gamesResponse[2]).results,
  //   randomGames: parseGamesInApiResponse(gamesResponse[3]).results,
  //   gamesILike
  // }

  // Dev
  const gamesILikeRes = await Promise.resolve(gamesILikeJson)
  const gamesILike = gamesILikeRes.map(parseSingleGameInApiResponse)
  const gamesResponse = parseGamesInApiResponse(
    await Promise.resolve(bestGames)
  )
  console.log({gamesResponse});
  return {
    heroGames: gamesResponse.results.slice(0, 6),
    lastYear: gamesResponse.results.slice(0, 15),
    newGames: gamesResponse.results.slice(0, 5),
    randomGames: gamesResponse.results.slice(0, 10),
    gamesILike
  }
}
