import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './SliderButtons.module.css'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

type SliderButtonsProps = {
  onClickLeft: () => void
  onClickRight: () => void
  children: React.ReactNode
}

const SliderButtons = ({ onClickLeft, onClickRight, children }: SliderButtonsProps) => {
  return (
    <div className={classes.hoverContainer}>
      <div className={classes.buttonContainer}>
        <button onClick={onClickLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      {children}
      <div className={classes.buttonContainer}>
        <button onClick={onClickRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}

export default SliderButtons
