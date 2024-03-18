// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import genre from '@/utils/apiGenreResponse.json'
import gamesJson from '@/utils/apiResponseSteam2.json'

export async function loader({ genreId }) {
  const genreJson = await Promise.resolve(genre);
  const games = await Promise.resolve(gamesJson);
  return {
    games,
    genre: genreJson,
  };
}
