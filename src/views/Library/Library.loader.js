import game from '@/utils/apiGameDetails.json'
import favs from '@/utils/apiGamesILikeResponse.json'
import { makeApiCalls, parseSingleGameInApiResponse } from '../../utils/helpersApi'
import { API_KEY_PARAM, API_URL } from '../../constans'
export async function loader () {
  // get game from api
  const gamesIds = JSON.parse(localStorage.getItem('idsStorage')).library
  const gameResponses = await makeApiCalls(
    gamesIds.map((gameId) => `${API_URL}/games/${gameId}?${API_KEY_PARAM}`)
  )

  // console.log({ gameResponses })
  // const games = await Promise.resolve(favs)
  return {
    games: gameResponses.map(parseSingleGameInApiResponse)
  }
}
