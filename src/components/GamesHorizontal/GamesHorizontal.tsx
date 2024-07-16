import GameCard from '../GameCard/GameCard'
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll.tsx'
import { getStringDate, restMonths } from '@/utils/helpersApi'
import { GameType } from '@/types/rawApiResponses'

const urlBrowse = `/store/browse?page=1&dates=${getStringDate(
  restMonths(new Date(), 12)
)},${getStringDate(new Date())}`
const GamesHorizontal = ({ games }: {games: GameType[]}) => {
  return (
    <HorizontalScroll title='Best Of This Year' linkTo={urlBrowse}>
      {games.map((game) => {
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

export default GamesHorizontal
