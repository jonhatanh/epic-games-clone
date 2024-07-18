import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './MainMedia.module.css'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { GameMedia } from '@/types'

type MainMediaProps = {
  allMedia: GameMedia[]
  mainMediaId: number
  setMainMediaId: (id: number) => void
}

const MainMedia = ({ allMedia, mainMediaId, setMainMediaId }: MainMediaProps) => {
  const currentIndex = allMedia.findIndex((media) => media.id === mainMediaId)

  function handleOverClick (direction: 'next' | 'prev') {
    let newIndex: number
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
          if ('data' in media) {
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

export default MainMedia
