import PropTypes from 'prop-types'
import classes from './Collapsable.module.css'
import { centerIcon } from '../../Global.module.css'
import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Collapsable = ({ children, size = 'normal' }) => {
  const [showCollapseButton, setShowCollapseButton] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const collapseRef = useRef(null)

  useEffect(() => {
    const collapseMaxHeight = collapseRef.current.offsetHeight
    const childHeight = collapseRef.current.firstChild.offsetHeight
    console.log(collapseMaxHeight, childHeight)
    setShowCollapseButton(childHeight > collapseMaxHeight)
    setCollapsed(childHeight > collapseMaxHeight)
  }, [])

  const collapsableClass = collapsed ? '' : classes.collapsableFalse

  function handleClick () {
    setCollapsed(!collapsed)
  }

  const collapsableSizeClass =
    size === 'small'
      ? classes.collapsableSmall
      : size === 'large'
        ? classes.collapsableLarge
        : ''
  return (
    <div
      ref={collapseRef}
      className={`${classes.collapsable} ${collapsableClass} ${collapsableSizeClass}`}
    >
      {children}
      {showCollapseButton && (
        <Button size='large' bgColor='gray' onClick={handleClick}>
          {collapsed ? 'Show more' : 'Show less'}{' '}
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ marginBottom: '2px' }}
          />
        </Button>
      )}
    </div>
  )
}

Collapsable.propTypes = {
  children: PropTypes.element.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large'])
}

export default Collapsable
