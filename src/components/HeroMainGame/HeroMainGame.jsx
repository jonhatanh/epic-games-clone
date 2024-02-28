import PropTypes from 'prop-types'
import classes from './HeroMainGame.module.css'
import globalClasses from '../../Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { randomPriceString } from '../../helpers'
const HeroMainGame = ({ game }) => {
  return (
    <div className={classes.mainGame}>
      <div className={classes.imageShadow} />
      <img
        src={game.background_image || '/assets/default_image.png'}
        alt={`${game.name} background image`}
      />
      <div className={classes.options}>
        <h3>{game.name}</h3>
        <p className={classes.price}>
          Starting at <span>{randomPriceString()}</span>
        </p>
        <div>
          <button className={`${globalClasses.button} ${globalClasses.buttonWhite}`}>
            Buy Now
          </button>
          <button className={`${globalClasses.button} ${globalClasses.buttonTransparent}`}>
            <FontAwesomeIcon icon={faCirclePlus} />
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

HeroMainGame.propTypes = {
  game: PropTypes
}

export default HeroMainGame
