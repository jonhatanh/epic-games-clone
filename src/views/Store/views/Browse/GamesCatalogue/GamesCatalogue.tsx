import classes from './GamesCatalogue.module.css'
import globalClasses from '@/Global.module.css'
import GameCard from '@/components/GameCard/GameCard.tsx'
import { GameDetailsType } from '@/types/rawApiResponses'

type GamesCatalogueProps = {
  games: GameDetailsType[]
  showPrice?: boolean
}
export default function GamesCatalogue ({ games, showPrice = true }: GamesCatalogueProps) {
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

