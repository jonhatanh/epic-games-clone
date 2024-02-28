import { randomPriceString } from '../../helpers'
import classes from './GameCard.module.css'
import PropTypes from 'prop-types'

const defaultDesc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus non dignissimos deserunt, tempore id commodi natus error sunt esse voluptatem.'

const GameCard = ({
  game: {
    id,
    name,
    background_image: backgroundImage,
    description = defaultDesc,
    price = randomPriceString()
  },
  mainGameId,
  index,
  changeMainGame,
  breakLines = '',
  showPrice = false,
  showDescription = false,
  cardSize = ''
}) => {
  const extraCardClass = mainGameId
    ? id === mainGameId
      ? classes.cardActive
      : ''
    : ''
  const cardSizeClass = cardSize === 'small' ? classes.cardSmall : ''
  return (
    <div
      className={`${classes.card} ${cardSizeClass} ${extraCardClass}`}
      onAnimationEnd={() => index !== null && changeMainGame(index)}
    >
      <img
        src={backgroundImage || '/assets/default_image.png'}
        alt={`${name} background image`}
      />
      <h3 className={`break_lines break_lines--${breakLines}`}>{name}</h3>
      {showPrice && price && <span>{price}</span>}
      {showDescription && description && <p>{description}</p>}
    </div>
  )
}

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number
  }),
  mainGameId: PropTypes.number,
  index: PropTypes.number,
  changeMainGame: PropTypes.func,
  breakLines: PropTypes.oneOf(['', 'two', 'three']),
  showPrice: PropTypes.bool,
  showDescription: PropTypes.bool,
  cardSize: PropTypes.oneOf(['', 'small'])
}

export default GameCard