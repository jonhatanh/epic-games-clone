import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './SliderButtons.module.css'
import PropTypes from 'prop-types'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const SliderButtons = ({ onClickLeft, onClickRight, children }) => {
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
