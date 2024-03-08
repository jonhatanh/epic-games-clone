import classes from './HeroSection.module.css'
import PropTypes from 'prop-types'
import HeroMainGame from '../HeroMainGame/HeroMainGame'
import { useEffect, useState } from 'react'
import GameCard from '@/components/GameCard/GameCard'
const HeroSection = ({ games }) => {
  const [mainGameId, setMainGameId] = useState(games[0].id)
  const mainGame = games.find((game) => game.id === mainGameId)

  useEffect(() => {}, [])

  function changeMainGame (index) {
    const newIndex = index === games.length - 1 ? 0 : index + 1
    setMainGameId(games[newIndex].id)
  }

  return (
    <article className={classes.heroGames}>
      {/* best last six months */}
      <HeroMainGame game={mainGame} />
      {games.map((game, index) => {
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
