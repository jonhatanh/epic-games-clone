import classes from './GamesCatalogue.module.css'
import globalClasses from '@/Global.module.css'
import PropTypes from 'prop-types'
import GameCard from '@/components/GameCard/GameCard'
export default function GamesCatalogue ({ games, showPrice = true }) {
  return (
    <section className={`${globalClasses.cardContainer} ${classes.catalogue}`}>
      {games.map((game) => {
        return (
          <GameCard
            key={game.id}
            game={game}
            showPrice={showPrice}
            breakLines='three'
            cardSize='big'
          />
        )
      })}
    </section>
  )
}

GamesCatalogue.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
  showPrice: PropTypes.bool
}
