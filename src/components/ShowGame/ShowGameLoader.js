import game from '../../apiGameDetails.json'
import gameAchievements from '../../apiAchievements.json'
import gameScreenshots from '../../apiScreenshots.json'
import gameMovies from '../../apiMovies.json'

export async function loader ({ gameId }) {
  // get game from api
  const response = await Promise.resolve(game)
  const achievements = await Promise.resolve(gameAchievements)
  const screenshots = await Promise.resolve(gameScreenshots)
  const movies = await Promise.resolve(gameMovies)
  return { game: response, achievements, screenshots, movies: movies.results.slice(0,2) }
}
