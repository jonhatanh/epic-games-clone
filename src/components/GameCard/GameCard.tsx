import { Link } from 'react-router-dom'
import classes from './GameCard.module.css'
import { GameDetailsType } from '@/types/rawApiResponses'

const defaultDesc =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim delectus non dignissimos deserunt, tempore id commodi natus error sunt esse voluptatem.'

type GameCardProps = {
  game: GameDetailsType,
  mainGameId?: GameDetailsType['id'],
  index?: number,
  changeMainGame?: (index: number) => void,
  breakLines?: '' | 'two' | 'three',
  showPrice?: boolean,
  showDescription?: boolean,
  cardSize?: '' | 'small' | 'big'
}

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
}: GameCardProps) => {
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

export default GameCard
