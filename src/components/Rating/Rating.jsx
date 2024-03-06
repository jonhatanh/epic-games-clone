import PropTypes, { number } from 'prop-types'
import classes from './Rating.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'

const Rating = ({ rating }) => {
  return (
    <section className={classes.ratingSection}>
      {/* Rating Section */}
      <h5>Rating</h5>
      <article>
        <span>{rating}</span>
        <div>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      </article>
    </section>
  )
}

Rating.propTypes = {
  rating: PropTypes.number
}

export default Rating
