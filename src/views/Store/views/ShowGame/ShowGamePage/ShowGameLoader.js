import game from '@/utils/apiGameDetails.json'
import gameAchievements from '@/utils/apiAchievements.json'
import gameScreenshots from '@/utils/apiScreenshots.json'
import gameMovies from '@/utils/apiMovies.json'
import { API_KEY_PARAM, API_URL } from '@/constans'
import { makeApiCalls, parseSingleGameInApiResponse } from '@/utils/helpersApi'

export async function loader ({ params: { gameId } }) {
  let gameResponses = []
  if (import.meta.env.PROD) {
    gameResponses = await makeApiCalls([
      `${API_URL}/games/${gameId}?${API_KEY_PARAM}`,
      `${API_URL}/games/${gameId}/screenshots?${API_KEY_PARAM}`,
      `${API_URL}/games/${gameId}/movies?${API_KEY_PARAM}`,
      `${API_URL}/games/${gameId}/achievements?${API_KEY_PARAM}`
    ])
  } else {
    gameResponses = [
      await Promise.resolve(game),
      await Promise.resolve(gameScreenshots),
      await Promise.resolve(gameMovies),
      await Promise.resolve(gameAchievements)
    ]
  }

  return {
    game: parseSingleGameInApiResponse(gameResponses[0]),
    screenshots: gameResponses[1].results,
    movies: gameResponses[2].results,
    achievements: gameResponses[3]
  }
}
