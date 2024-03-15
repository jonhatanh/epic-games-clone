import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './GalleryItems.module.css'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import PropTypes, { object } from 'prop-types'

const GalleryItems = ({ media, mainMediaId, changeMediaId }) => {
  return (
    <div className={classes.gallery}>
      {/* <button>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button> */}
      <ul>
        {media.map((mediaItem) => {
          if (mediaItem.data) {
            // is video
            return (
              <li
                key={mediaItem.id}
                className={`${classes.mediaWrapper} ${
                  mediaItem.id === mainMediaId ? classes.active : ''
                }`}
                onClick={() => changeMediaId(mediaItem.id)}
              >
                <FontAwesomeIcon icon={faPlay} />
                <img
                  src={mediaItem.preview}
                  alt={mediaItem.name + 'video preview'}
                />
              </li>
            )
          } else {
            return (
              <li
                key={mediaItem.id}
                className={`${classes.mediaWrapper} ${
                  mediaItem.id === mainMediaId ? classes.active : ''
                }`}
                onClick={() => changeMediaId(mediaItem.id)}
              >
                <img src={mediaItem.image} alt='Game Image' />
              </li>
            )
          }
        })}
      </ul>
      {/* <button>
          <FontAwesomeIcon icon={faChevronRight} />
        </button> */}
    </div>
  )
}

GalleryItems.propTypes = {
  media: PropTypes.arrayOf(object),
  mainMediaId: PropTypes.number,
  changeMediaId: PropTypes.func
}

export default GalleryItems
