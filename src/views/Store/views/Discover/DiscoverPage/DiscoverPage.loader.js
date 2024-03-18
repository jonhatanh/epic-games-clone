// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import bestGames from '@/utils/apiResponseSteam2.json'
import gamesILike from '@/utils/apiGamesILikeResponse.json'
import { API_URL, DEFAULT_QUERY_STRING } from '@/constans.js';

export async function loader () {
  const response = await Promise.resolve(bestGames)
  const gamesILikeResponse = await Promise.resolve(gamesILike)
  return {
    heroGames: response,
    gamesILike: gamesILikeResponse
  }
}
