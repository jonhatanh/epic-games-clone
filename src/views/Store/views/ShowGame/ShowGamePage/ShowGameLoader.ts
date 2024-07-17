import game from '@/utils/apiGameDetails.json'
import gameAchievements from '@/utils/apiAchievements.json'
import gameScreenshots from '@/utils/apiScreenshots.json'
import gameMovies from '@/utils/apiMovies.json'
import { API_KEY_PARAM, API_URL } from '@/constans'
import { makeApiCalls, parseSingleGameInApiResponse } from '@/utils/helpersApi'
import { LoaderFunctionArgs } from 'react-router'
import { GameDetailsApiResponse, GameDetailsType } from '@/types/rawApiResponses'
import { AchievementsApiType, GameScreenshotsApiType, GameScreenshotsType, GameVideosApiType, GameVideosType } from '@/types'

type GameInfoType = GameDetailsApiResponse | GameScreenshotsApiType | GameVideosApiType | AchievementsApiType
type ApiCallsType = (GameInfoType)[]

export type ShowGameLoaderType = {
  game: GameDetailsType;
  screenshots: GameScreenshotsType[];
  movies: GameVideosType[];
  achievements: AchievementsApiType;
}
export async function loader ({ params: { gameId } }: LoaderFunctionArgs) {
  let gameResponses: ApiCallsType
  if (import.meta.env.PROD) {
    gameResponses = await makeApiCalls<GameInfoType>([
      `${API_URL}/games/${gameId}?${API_KEY_PARAM}`,
      `${API_URL}/games/${gameId}/screenshots?${API_KEY_PARAM}`,
      `${API_URL}/games/${gameId}/movies?${API_KEY_PARAM}`,
      `${API_URL}/games/${gameId}/achievements?${API_KEY_PARAM}`
    ])
  } else {
    gameResponses = [
      await Promise.resolve(game) as unknown as GameDetailsApiResponse,
      await Promise.resolve(gameScreenshots),
      await Promise.resolve(gameMovies) as unknown as GameVideosApiType,
      await Promise.resolve(gameAchievements)
    ]
  }

  return {
    game: parseSingleGameInApiResponse(gameResponses[0] as GameDetailsApiResponse),
    screenshots: (gameResponses[1] as GameScreenshotsApiType).results,
    movies: (gameResponses[2] as GameVideosApiType).results,
    achievements: gameResponses[3] as AchievementsApiType
  }
}
