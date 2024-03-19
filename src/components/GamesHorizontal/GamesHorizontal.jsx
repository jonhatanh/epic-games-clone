import PropTypes from 'prop-types'
import GameCard from '../GameCard/GameCard'
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll'
import { getStringDate, restMonths } from '../../utils/helpersApi'

const urlBrowse = `/store/browse?page=1&dates=${getStringDate(
  restMonths(new Date(), 12)
)},${getStringDate(new Date())}`;
const GamesHorizontal = ({ games }) => {
  return (
    <HorizontalScroll title='Best Of This Year' linkTo={urlBrowse}>
      {games.map((game, index) => {
        return (
          <GameCard
            key={game.id}
            game={game}
            showPrice
            breakLines='three'
            cardSize='big'
          />
        )
      })}
    </HorizontalScroll>
  )
}

GamesHorizontal.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default GamesHorizontal
