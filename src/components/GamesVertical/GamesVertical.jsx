import classes from './GamesVertical.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import GameCard from '../GameCard/GameCard'
import { randomNumber } from '../../utils/helpers'
import { Link } from 'react-router-dom'

const urlReleases = '/store/browse?page=1&ordering=-released'
const urlRandom = `/store/browse?page=${randomNumber()}`

const GamesVertical = ({ randomGames, recentGames }) => {
  return (
    <article className={classes.listOfGamesVertical}>
      <div className={classes.listTitle}>
        <h2><Link to={urlReleases}>New Releases</Link></h2>
        <FontAwesomeIcon className={classes.centerIcon} icon={faChevronRight} />
      </div>
      <div className={`${classes.listTitle} ${classes.listTitleDouble}`}>
        <h2><Link to={urlRandom}>Random Games</Link></h2>
        <FontAwesomeIcon className={classes.centerIcon} icon={faChevronRight} />
      </div>
      <div className={classes.verticalList}>
        {recentGames.map((game, index) => {
          return <GameCard key={game.id} game={game} cardSize='small' />
        })}
      </div>
      <div className={`${classes.verticalList} ${classes.verticalListDouble}`}>
        {randomGames.map((game, index) => {
          return <GameCard key={game.id} game={game} cardSize='small' />
        })}
      </div>
    </article>
  )
}

GamesVertical.propTypes = {
  randomGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default GamesVertical
