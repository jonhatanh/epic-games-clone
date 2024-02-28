import classes from './Hero.module.css'
import globalClasses from './../../Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { randomPriceString } from '../../helpers'
import HeroMainGame from '../HeroMainGame/HeroMainGame'
const Hero = ({ games }) => {
  const game1 = games[0]
  return (
    <article className={classes.heroGames}>
      {/* best last six months */}
      <HeroMainGame game={game1} />
      {games.map((game, index) => {
        return (
          <div key={index} className={globalClasses.cardHero}>
            <img
              src={game.background_image || '/assets/default_image.png'}
              alt={`${game.name} background image`}
            />
            <h3 className='break_lines break_lines--two'>{game.name}</h3>
          </div>
        )
      })}
    </article>
  )
}

Hero.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Hero
