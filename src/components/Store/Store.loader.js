// import heroGames from '../../apiResponse.json'
import bestGames from '../../apiResponseTest.json'

export async function gamesLoader () {
  const response = await Promise.resolve(bestGames)
  return {
    heroGames: response
  }
}
