import { useLoaderData } from 'react-router-dom'
import classes from './GenrePage.module.css'
import GameGenres from '../GamesGenres/GameGenres'
import GamesCatalogue from '../GamesCatalogue/GamesCatalogue'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import FilterItem from '@/components/FilterItem/FilterItem'
import Filters from '@/views/Store/views/Browse/Filters/Filters'
import Collapsable from '../../../../../components/Collapsable/Collapsable'
import Button from '../../../../../components/Button/Button'

export default function GenrePage () {
  const { games, genre, currentFilters } = useLoaderData()
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
        <GamesCatalogue games={games.results} />
        <Filters currentFilters={currentFilters} />
      </div>
      <div className={classes.pagesButtons}>
        {games.previous && (
          <Button link to={games.previous} bgColor='gray' size='small'>
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous Page
          </Button>
        )}
        {games.next && (
          <Button
            link
            to={games.next}
            bgColor='white'
            style={{ marginLeft: 'auto' }}
          >
            Next Page <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        )}
      </div>
    </section>
  )
}
