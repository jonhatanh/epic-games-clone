import { Link } from 'react-router-dom'
import classes from './GenreCard.module.css'
import PropTypes from 'prop-types'

const GenreCard = ({
  genre: { id, name, slug, image_background: backgroundImage }
}) => {
  return (
    <Link className={`${classes.card}`} to={`/store/genre/${slug}`}>
      <img
        src={backgroundImage || '/assets/default_image.png'}
        alt={`${name} genre background image`}
      />
      <h5 className='break_lines'>{name}</h5>
    </Link>
  )
}

GenreCard.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image_background: PropTypes.string.isRequired
  })
}

export default GenreCard
