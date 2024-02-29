import PropTypes from 'prop-types'
import classes from './HeroMainGame.module.css'
import globalClasses from '../../Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { randomPriceString } from '../../helpers'
import { useEffect, useRef } from 'react'
const HeroMainGame = ({ game }) => {
  const imageRef = useRef(null)
  useEffect(() => {
    imageRef.current.classList.remove(classes.enterAnimation)
    imageRef.current.offsetWidth
    imageRef.current.classList.add(classes.enterAnimation)
  }, [game.id])
  return (
    <div className={classes.mainGame}>
      <div className={classes.imageShadow} />
      <img
        ref={imageRef}
        className={classes.enterAnimation}
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
  game: PropTypes.object.isRequired
}

export default HeroMainGame
