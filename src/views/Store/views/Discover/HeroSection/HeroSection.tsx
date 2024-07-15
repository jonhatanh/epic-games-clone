import classes from './HeroSection.module.css'
import HeroMainGame from '../HeroMainGame/HeroMainGame'
import { useState } from 'react'
import GameCard from '@/components/GameCard/GameCard'
import { useMediaQuery } from '@/hooks/useMediaQuery.ts'
import { GameType } from '@/types/rawApiResponses'
const HeroSection = ({ games }: { games: GameType[] }) => {
  const match = useMediaQuery('(max-width: 450px)')
  const [mainGameId, setMainGameId] = useState(games[0].id)
  const mainGame = games.find((game) => game.id === mainGameId)! //Maybe add better validation
  const mainGameIndex = games.findIndex(game => game.id === mainGameId)

  function changeMainGame(index: number) {
    const newIndex = index === games.length - 1 ? 0 : index + 1
    setMainGameId(games[newIndex].id)
  }
  function changeMainGameFromSlider(index: number) {
    let newIndex = index
    if (index === games.length) {
      newIndex = 0
    }
    if (index === -1) {
      newIndex = games.length - 1
    }
    setMainGameId(games[newIndex].id)
  }
  return (
    <article className={classes.heroGames}>
      <HeroMainGame
        game={mainGame}
        changeMainGame={changeMainGameFromSlider}
        index={mainGameIndex}
      />
      {!match &&
        games.map((game, index) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              mainGameId={mainGameId}
              changeMainGame={changeMainGame}
              breakLines='two'
            />
          )
        })}
    </article>
  )
}

export default HeroSection
