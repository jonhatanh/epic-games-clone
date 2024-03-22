import PropTypes from 'prop-types'
import classes from './HeroMainGame.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleMinus,
  faCirclePlus,
  faPoundSign
} from '@fortawesome/free-solid-svg-icons'
import { randomPriceString } from '@/utils/helpers'
import { useContext, useEffect, useRef } from 'react'
import Button from '@/components/Button/Button'
import { Link } from 'react-router-dom'
import { StorageContext } from "@/hooks/useGamesStorage";
import ActionStorageButton from '../../../../../components/ActionStorageButton/ActionStorageButton'
const HeroMainGame = ({ game }) => {
  const imageRef = useRef(null)
  useEffect(() => {
    imageRef.current.classList.remove(classes.enterAnimation)
    imageRef.current.offsetWidth
    imageRef.current.classList.add(classes.enterAnimation)
  }, [game.id])

  const { addGame, removeGame, gameInStorage } = useContext(StorageContext)
  const gameInWishlist = gameInStorage(game.id, 'wishlist')
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
        <h3>
          <Link to={`games/${game.id}`}>{game.name}</Link>
        </h3>
        <p className={classes.price}>
          Starting at <span>{game.price}</span>
        </p>
        <div>
          <Button bgColor='white' link to={`games/${game.id}`}>
            Buy Now
          </Button>
          <ActionStorageButton
            storageName='wishlist'
            gameId={game.id}
            autoText
            icon={{ positive: faCirclePlus, negative: faCircleMinus }}
            textSize='small'
          />
        </div>
      </div>
    </div>
  )
}

HeroMainGame.propTypes = {
  game: PropTypes.object.isRequired
}

export default HeroMainGame
