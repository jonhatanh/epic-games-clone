import { useLoaderData } from 'react-router-dom'
import classes from './GamesCatalogue.module.css'
import globalClasses from '@/Global.module.css'
import PropTypes from 'prop-types'
import GameCard from '@/components/GameCard/GameCard'
export default function GamesCatalogue ({ games }) {
  return (
    <section className={`${globalClasses.cardContainer} ${classes.catalogue}`}>
      {games.results.map((game, index) => {
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
    </section>
  )
}

GamesCatalogue.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object)
}
