import classes from './GamesHorizontal.module.css'
import globalClasses from '@/Global.module.css'
import GameCard from '../GameCard/GameCard'
import { GameDetailsType } from '@/types/rawApiResponses'
const GamesHorizontalBig = ({ games }: { games: GameDetailsType[] }) => {
  return (
    <article className={classes.listOfGamesHorizontal}>
      <header>
        <h2>Games I Like :)</h2>
      </header>
      <div
        className={`${globalClasses.cardContainer} ${globalClasses.cardContainerThree}`}
      >
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              showDescription
              breakLines='three'
              cardSize='big'
            />
          )
        })}
      </div>
    </article>
  )
}

export default GamesHorizontalBig
