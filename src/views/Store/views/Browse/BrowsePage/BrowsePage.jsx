import { useLoaderData } from 'react-router-dom'
import classes from './BrowsePage.module.css'
import GameGenres from '../GamesGenres/GameGenres'
import GamesCatalogue from '../GamesCatalogue/GamesCatalogue'
export default function BrowsePage () {
  const { games } = useLoaderData()
  console.log(games)
  return (
    <section className={classes.browse}>
      <GameGenres />

      <GamesCatalogue games={games} />
    </section>
  )
}
