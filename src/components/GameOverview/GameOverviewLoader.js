import game from '../../apiGameDetails.json'

export async function loader ({ gameId }) {
  // get game from api
  const response = await Promise.resolve(game)
  return { game: response }
}
