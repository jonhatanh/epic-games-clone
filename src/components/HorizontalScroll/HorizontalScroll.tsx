import classes from './HorizontalScroll.module.css'
import globalClasses from '@/Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PropsWithChildren } from 'react'

type HorizontalScrollProps = PropsWithChildren<{
  title: string
  linkTo?: string
}>

const HorizontalScroll = ({ children, title, linkTo = '' }: HorizontalScrollProps) => {
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false)
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const scrollEndRef = useRef<number | null>(null)
  function moveScrollBar (moveToRight: boolean) {
    if(!contentContainerRef.current) return
    const parentWidth = contentContainerRef.current.offsetWidth
    const firstChild = contentContainerRef.current.firstChild as HTMLElement | null
    const widthChilds = firstChild ? firstChild.offsetWidth : 0
    let pxBaseOnChilds = widthChilds
      ? Math.floor(parentWidth / widthChilds) * widthChilds
      : parentWidth
    pxBaseOnChilds = pxBaseOnChilds || 150
    const pxMovedLeft = contentContainerRef.current.scrollLeft
    const pxToMove = moveToRight
      ? pxMovedLeft + pxBaseOnChilds
      : pxMovedLeft - pxBaseOnChilds
    contentContainerRef.current.scrollTo(pxToMove, 0)
  }

  function checkButtonStatus() {
    if (scrollEndRef.current === null) {
      scrollEndRef.current = setTimeout(() => {
        if (!contentContainerRef.current) return
        const leftButtonIsDisabled =
          contentContainerRef.current.scrollLeft === 0
        const rightButtonIsDisabled =
          contentContainerRef.current.scrollLeft +
            contentContainerRef.current.clientWidth ===
          contentContainerRef.current.scrollWidth
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
          {linkTo
            ? (
              <Link to={linkTo}>
                {title}
                <span>
                  <FontAwesomeIcon
                    className={globalClasses.centerIcon}
                    icon={faChevronRight}
                  />
                </span>
              </Link>
              )
            : (
                title
              )}
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
        onScroll={() => checkButtonStatus()}
      >
        {children}
      </div>
    </article>
  )
}

export default HorizontalScroll
