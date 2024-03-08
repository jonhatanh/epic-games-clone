import game from '@/utils/apiGameDetails.json'
import gameAchievements from '@/utils/apiAchievements.json'
import gameScreenshots from '@/utils/apiScreenshots.json'
import gameMovies from '@/utils/apiMovies.json'

export async function loader ({ gameId }) {
  // get game from api
  const response = await Promise.resolve(game)
  const achievements = await Promise.resolve(gameAchievements)
  const screenshots = await Promise.resolve(gameScreenshots)
  const movies = await Promise.resolve(gameMovies)
  return { game: response, achievements, screenshots, movies: movies.results.slice(0, 2) }
}
