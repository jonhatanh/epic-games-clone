import PropTypes from 'prop-types'
import GameCard from '../GameCard/GameCard'
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll'
const GamesHorizontal = ({ games }) => {
  return (
    <HorizontalScroll title='Best Of This Year'>
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
