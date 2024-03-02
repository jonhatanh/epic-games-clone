import game from '../../apiGameDetails.json'
import achievements from '../../apiAchievements.json'

export async function loader ({ gameId }) {
  // get game from api
  const response = await Promise.resolve(game)
  const achievementsResponse = await Promise.resolve(achievements)
  return { game: response, achievements: achievementsResponse }
}
