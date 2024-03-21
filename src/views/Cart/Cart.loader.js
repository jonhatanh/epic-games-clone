import game from '@/utils/apiGameDetails.json'
import favs from '@/utils/apiGamesILikeResponse.json'
import { parseSingleGameInApiResponse } from '../../utils/helpersApi'
export async function loader () {
  // get game from api
  // const games = JSON.parse(localStorage.getItem('idsStorage')).wishlist
  // const gameResponses = await makeApiCalls([
  //   `${API_URL}/games/${gameId}?${API_KEY_PARAM}`,
  // ])

  // const games = [
  //   await Promise.resolve(game),
  // ]

  const games = await Promise.resolve(favs)
  return {
    games: games.map(parseSingleGameInApiResponse)
  }
}
