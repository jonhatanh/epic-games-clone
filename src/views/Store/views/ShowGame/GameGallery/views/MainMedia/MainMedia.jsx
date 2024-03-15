import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './MainMedia.module.css'
import PropTypes from 'prop-types'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const MainMedia = ({ allMedia, mainMediaId, setMainMediaId }) => {
  const currentIndex = allMedia.findIndex((media) => media.id === mainMediaId)

  function handleOverClick (direction) {
    let newIndex
    if (direction === 'next') {
      newIndex = currentIndex === allMedia.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? allMedia.length - 1 : currentIndex - 1
    }
    setMainMediaId(allMedia[newIndex].id)
  }
  return (
    <div className={classes.hoverContainer}>
      <div className={classes.buttonContainer}>
        <button onClick={() => handleOverClick('prev')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div
        className={classes.mainImage}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {allMedia.map((media) => {
          if (media.data) {
            return (
              <video
                key={media.id}
                src={media.data['480']}
                autoPlay={media.id === mainMediaId}
                controls
                muted={media.id !== mainMediaId}
              />
            )
          } else {
            return <img key={media.id} src={media.image} alt='Game Image' />
          }
        })}
      </div>
      <div className={classes.buttonContainer}>
        <button onClick={() => handleOverClick('next')}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}

MainMedia.propTypes = {
  allMedia: PropTypes.arrayOf(PropTypes.object),
  mainMediaId: PropTypes.number,
  setMainMediaId: PropTypes.func
}

export default MainMedia
