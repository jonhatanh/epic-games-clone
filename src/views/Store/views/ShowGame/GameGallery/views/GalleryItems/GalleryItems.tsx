import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './GalleryItems.module.css'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { GameMedia } from '@/types'

type GalleryItemsProps = {
  media: GameMedia[]
  mainMediaId: number
  changeMediaId: (id: number) => void
}

const GalleryItems = ({ media, mainMediaId, changeMediaId }: GalleryItemsProps) => {
  return (
    <div className={classes.gallery}>
      {/* <button>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button> */}
      <ul>
        {media.map((mediaItem) => {
          if ('data' in mediaItem) {
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

export default GalleryItems
