import { useLoaderData } from 'react-router-dom'
import classes from './GenrePage.module.css'
import GameGenres from '../GamesGenres/GameGenres'
import GamesCatalogue from '../GamesCatalogue/GamesCatalogue'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import FilterItem from '@/components/FilterItem/FilterItem'
import Filters from '@/views/Store/views/Browse/Filters/Filters'
import Collapsable from '../../../../../components/Collapsable/Collapsable'

export default function GenrePage () {
  const { games, genre } = useLoaderData()
  console.log(games)
  return (
    <section className={classes.genreGames}>
      <h2>{genre.name} Games</h2>
      <Collapsable>
        <p
          className={classes.gameDescription}
          dangerouslySetInnerHTML={{
            __html: genre.description
          }}
        />
      </Collapsable>
      <div className={classes.main}>
        <GamesCatalogue games={games} />
        <Filters />
      </div>
    </section>
  )
}
