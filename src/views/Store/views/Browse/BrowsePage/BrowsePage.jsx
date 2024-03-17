import { useLoaderData } from 'react-router-dom'
import classes from './BrowsePage.module.css'
import GameGenres from '../GamesGenres/GameGenres'
import GamesCatalogue from '../GamesCatalogue/GamesCatalogue'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import FilterItem from '@/components/FilterItem/FilterItem'
import Filters from '@/views/Store/views/Browse/Filters/Filters'

export default function BrowsePage () {
  const { games} = useLoaderData()
  console.log(games)
  return (
    <section className={classes.browse}>
      <GameGenres />

      <div className={classes.main}>
        <GamesCatalogue games={games} />
        <Filters />
      </div>
    </section>
  )
}
