import classes from './GamesHorizontal.module.css'
import globalClasses from './../../Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import GameCard from '../GameCard/GameCard'
const GamesHorizontalBig = ({ games }) => {
  return (
    <article className={classes.listOfGamesHorizontal}>
      <header>
        <h2>
          Best Of All Time
          <span>
            <FontAwesomeIcon
              className={globalClasses.centerIcon}
              icon={faChevronRight}
            />
          </span>
        </h2>
      </header>
      <div
        className={`${globalClasses.cardContainer} ${globalClasses.cardContainerThree}`}
      >
        {games.map((game, index) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              showDescription
              breakLines='three'
            />
          )
        })}
      </div>
    </article>
  )
}

GamesHorizontalBig.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default GamesHorizontalBig
