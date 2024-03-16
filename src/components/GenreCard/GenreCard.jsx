import { Link } from 'react-router-dom'
import classes from './GenreCard.module.css'
import PropTypes from 'prop-types'

const GenreCard = ({
  genre: { id, name, slug, image_background: backgroundImage }
}) => {
  return (
    <Link className={`${classes.card}`} to={`genre/${slug}`}>
      <img
        src={backgroundImage || '/assets/default_image.png'}
        alt={`${name} genre background image`}
      />
      <h5 className='break_lines'>{name}</h5>
    </Link>
  )
}

GenreCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image_background: PropTypes.string.isRequired
  })
}

export default GenreCard
