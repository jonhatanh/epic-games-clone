import { useLoaderData } from 'react-router-dom'
import classes from './BrowsePage.module.css'
import GameGenres from '../GamesGenres/GameGenres'
import GamesCatalogue from '../GamesCatalogue/GamesCatalogue'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import FilterItem from '@/components/FilterItem/FilterItem'
import Filters from '@/views/Store/views/Browse/Filters/Filters'
import Button from '../../../../../components/Button/Button'

export default function BrowsePage () {
  const { games, genres, currentFilters } = useLoaderData()
  console.log(games)
  return (
    <section className={classes.browse}>
      <GameGenres />

      <div className={classes.main}>
        <GamesCatalogue games={games} />
        <Filters genres={genres} currentFilters={currentFilters} />
      </div>

      <div className={classes.pagesButtons}>
        {games.previous && (
          <Button link to={games.previous} bgColor="gray" size="small">
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous Page
          </Button>
        )}
        {games.next && (
          <Button
            link
            to={games.next}
            bgColor="white"
            style={{ marginLeft: "auto" }}
          >
            Next Page <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        )}
      </div>
    </section>
  );
}
