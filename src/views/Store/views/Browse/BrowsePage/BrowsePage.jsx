import { useLoaderData } from 'react-router-dom'
import classes from './BrowsePage.module.css'
import GameGenres from '../GamesGenres/GameGenres'
export default function BrowsePage () {
  return (
    <section className={classes.browse}>
      <GameGenres />


    </section>
  )
}
