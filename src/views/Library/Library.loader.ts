// import game from '@/utils/apiGameDetails.json'
// import favs from '@/utils/apiGamesILikeResponse.json'
import { makeApiCalls, parseSingleGameInApiResponse } from '../../utils/helpersApi'
import { API_KEY_PARAM, API_URL } from '../../constans'
import { StorageType } from '@/hooks/useGamesStorage'
import { GameDetailsApiResponse } from '@/types/rawApiResponses'
export async function loader () {
  const idsStorage = localStorage.getItem('idsStorage')
  if (!idsStorage) return { games: [] }
  // get game from api
  const gamesIds = JSON.parse(idsStorage).library as StorageType['library']
  const gameResponses = await makeApiCalls<GameDetailsApiResponse>(
    gamesIds.map((gameId) => `${API_URL}/games/${gameId}?${API_KEY_PARAM}`)
  )

  // console.log({ gameResponses })
  // const games = await Promise.resolve(favs)
  return {
    games: gameResponses.map((game) => parseSingleGameInApiResponse(game))
  }
}
