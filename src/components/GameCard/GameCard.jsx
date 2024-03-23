import { Link } from 'react-router-dom'
import classes from './GameCard.module.css'
import PropTypes from 'prop-types'

const defaultDesc =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus non dignissimos deserunt, tempore id commodi natus error sunt esse voluptatem.'

const GameCard = ({
  game: {
    id,
    name,
    background_image: backgroundImage,
    description = defaultDesc,
    price
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
  const cardSizeClass =
    cardSize === 'small'
      ? classes.cardSmall
      : cardSize === 'big'
        ? classes.cardBig
        : ''
  const cardContent = (
    <>
      <img
        src={backgroundImage || '/assets/default_image.png'}
        alt={`${name} background image`}
      />
      <h3 className={`break_lines break_lines--${breakLines}`}>{name}</h3>
      {showPrice && price && <span>{price}</span>}
      {showDescription && description && (
        <p
          className={classes.gameDescription}
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
      )}
    </>
  )
  return index !== undefined && changeMainGame
    ? (
      <div
        className={`${classes.card} ${cardSizeClass} ${extraCardClass}`}
        onAnimationEnd={() => changeMainGame(index)}
        onClick={() => changeMainGame(index - 1)}
      >
        {cardContent}
      </div>
      )
    : (
      <Link
        className={`${classes.card} ${cardSizeClass} ${extraCardClass}`}
        to={`/store/games/${id}`}
      >
        {cardContent}
      </Link>
      )
}

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  mainGameId: PropTypes.number,
  index: PropTypes.number,
  changeMainGame: PropTypes.func,
  breakLines: PropTypes.oneOf(['', 'two', 'three']),
  showPrice: PropTypes.bool,
  showDescription: PropTypes.bool,
  cardSize: PropTypes.oneOf(['', 'small', 'big'])
}

export default GameCard
