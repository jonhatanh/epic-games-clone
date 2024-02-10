import heroGames from '../../apiResponse.json'

export async function gamesLoader () {
  const response = await Promise.resolve(heroGames)
  return {
    heroGames: response
  }
}
