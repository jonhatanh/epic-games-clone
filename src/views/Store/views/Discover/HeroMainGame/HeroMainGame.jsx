import PropTypes from 'prop-types'
import classes from './HeroMainGame.module.css'
import {
  faCircleMinus,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'
import Button from '@/components/Button/Button'
import { Link } from 'react-router-dom'
import ActionStorageButton from '@/components/ActionStorageButton/ActionStorageButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SliderButtons from '@/components/SliderButtons/SliderButtons'
const HeroMainGame = ({ game, changeMainGame, index }) => {
  const match = useMediaQuery('(max-width: 450px)')
  const imageRef = useRef(null)
  useEffect(() => {
    imageRef.current.classList.remove(classes.enterAnimation)
    imageRef.current.offsetWidth
    imageRef.current.classList.add(classes.enterAnimation)
  }, [game.id])

  const component = (
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
          <Button
            size={match ? 'large' : 'normal'}
            bgColor='white'
            link
            to={`games/${game.id}`}
          >
            Buy Now
          </Button>
          <ActionStorageButton
            storageName='wishlist'
            gameId={game.id}
            size={match ? 'large' : 'normal'}
            icon={{ positive: faCirclePlus, negative: faCircleMinus }}
            textSize='small'
          />
        </div>
      </div>
    </div>
  )
  if (match) {
    return (
      <SliderButtons
        onClickLeft={() => changeMainGame(index - 1)}
        onClickRight={() => changeMainGame(index + 1)}
      >
        {component}
      </SliderButtons>
    )
  }
  return component
}

HeroMainGame.propTypes = {
  game: PropTypes.object.isRequired,
  changeMainGame: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default HeroMainGame
