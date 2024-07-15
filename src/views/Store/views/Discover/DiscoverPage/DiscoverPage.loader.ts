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
import { GameDetailsApiResponse, GamesApiResponse } from '@/types/rawApiResponses'

type GamesILike = GameDetailsApiResponse[]

export async function loader () {
  const gamesILikeRes = await Promise.resolve(gamesILikeJson) as unknown as GamesILike
  const gamesILike = gamesILikeRes.map((game) => parseSingleGameInApiResponse(game))
  if (import.meta.env.PROD) {
    const gamesResponse = await makeApiCalls<GamesApiResponse>([
      `${API_URL}/games${DEFAULT_QUERY_STRING}&dates=${getStringDate(
        restMonths(new Date(), 3)
      )},${getStringDate(new Date())}&page_size=6`,
      `${API_URL}/games${DEFAULT_QUERY_STRING}&dates=${getStringDate(
        restMonths(new Date(), 12)
      )},${getStringDate(new Date())}&page_size=15`,
      `${API_URL}/games${DEFAULT_QUERY_STRING}&ordering=-released&page_size=5`,
      `${API_URL}/games${DEFAULT_QUERY_STRING}&page=${randomNumber()}&page_size=10`
    ])
    return {
      heroGames: parseGamesInApiResponse(gamesResponse[0]).results,
      lastYear: parseGamesInApiResponse(gamesResponse[1]).results,
      newGames: parseGamesInApiResponse(gamesResponse[2]).results,
      randomGames: parseGamesInApiResponse(gamesResponse[3]).results,
      gamesILike
    }
  }
  // Development
  const gamesResponse = parseGamesInApiResponse(await Promise.resolve(bestGames) as GamesApiResponse)
  return {
    heroGames: gamesResponse.results.slice(0, 6),
      lastYear: gamesResponse.results.slice(0, 15),
        newGames: gamesResponse.results.slice(0, 5),
          randomGames: gamesResponse.results.slice(0, 10),
            gamesILike
  }
  
}
