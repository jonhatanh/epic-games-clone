// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import genresJson from '@/utils/apiGenresResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'

export async function browseLoader ({ request }) {
  const queryString = new URL(request.url).search
  const genres = await Promise.resolve(genresJson)
  const games = await Promise.resolve(gamesJson)
  return {
    games,
    genres
  }
}
