import classes from './HeroSection.module.css'
import PropTypes from 'prop-types'
import HeroMainGame from '../HeroMainGame/HeroMainGame'
import { useState } from 'react'
import GameCard from '@/components/GameCard/GameCard'
import { useMediaQuery } from '@/hooks/useMediaQuery'
const HeroSection = ({ games }) => {
  const match = useMediaQuery('(max-width: 450px)')
  const [mainGameId, setMainGameId] = useState(games[0].id)
  const mainGame = games.find((game) => game.id === mainGameId)
  const mainGameIndex = games.findIndex(game => game.id === mainGameId)

  function changeMainGame (index) {
    const newIndex = index === games.length - 1 ? 0 : index + 1
    setMainGameId(games[newIndex].id)
  }
  function changeMainGameFromSlider (index) {
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

HeroSection.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default HeroSection
