// import heroGames from '../../apiResponse.json'
// import bestGames from '../../apiResponseTest.json'
// import bestGames from '../../apiResponseTest2.json'
import genresJson from '@/utils/apiGenresResponse.json'

export async function browseLoader () {
  const genres = await Promise.resolve(genresJson);
  return {
    genres,

  }
}
