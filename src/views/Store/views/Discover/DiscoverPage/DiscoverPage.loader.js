// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import bestGames from '@/utils/apiResponseSteam2.json'

export async function gamesLoader () {
  const response = await Promise.resolve(bestGames)
  return {
    heroGames: response
  }
}
