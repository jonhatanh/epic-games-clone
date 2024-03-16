import classes from './HorizontalScroll.module.css'
import globalClasses from '@/Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
const HorizontalScroll = ({ children, title, qtyOfItems }) => {
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false)
  const contentContainerRef = useRef(null)
  const scrollEndRef = useRef(null)
  function moveScrollBar (moveToRight) {
    const percentOfTotal = contentContainerRef.current.offsetWidth
    const pxMovedLeft = contentContainerRef.current.scrollLeft
    const pxToMove = moveToRight
      ? pxMovedLeft + percentOfTotal
      : pxMovedLeft - percentOfTotal
    contentContainerRef.current.scrollTo(pxToMove, 0)
  }

  function checkButtonStatus (e) {
    if (scrollEndRef.current === null) {
      scrollEndRef.current = setTimeout(() => {
        console.log('chekcing', e)
        const leftButtonIsDisabled =
          contentContainerRef.current?.scrollLeft === 0
        const rightButtonIsDisabled =
          contentContainerRef.current?.scrollLeft +
            contentContainerRef.current?.clientWidth ===
          contentContainerRef.current?.scrollWidth
        setLeftButtonDisabled(leftButtonIsDisabled)
        setRightButtonDisabled(rightButtonIsDisabled)
        scrollEndRef.current = null
      }, 500)
    }
  }

  return (
    <article className={classes.horizontalScroll}>
      <header>
        <h2>
          {title}
          <span>
            <FontAwesomeIcon
              className={globalClasses.centerIcon}
              icon={faChevronRight}
            />
          </span>
        </h2>
        <div>
          <button
            className={`${globalClasses.buttonCircular} ${
              leftButtonDisabled && globalClasses.disabled
            }`}
            onClick={() => moveScrollBar(false)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={`${globalClasses.buttonCircular} ${
              rightButtonDisabled && globalClasses.disabled
            }`}
            onClick={() => moveScrollBar(true)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </header>
      <div
        ref={contentContainerRef}
        className={globalClasses.cardContainer}
        onScroll={(e) => checkButtonStatus(e)}
      >
        {children}
      </div>
    </article>
  )
}

HorizontalScroll.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired
}

export default HorizontalScroll
