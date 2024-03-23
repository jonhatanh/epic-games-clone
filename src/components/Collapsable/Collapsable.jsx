import PropTypes from 'prop-types'
import classes from './Collapsable.module.css'
import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Collapsable = ({ children, size = 'normal' }) => {
  const [showCollapseButton, setShowCollapseButton] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const collapseRef = useRef(null)

  useEffect(() => {
    function buttonIsNecessary () {
      const collapseMaxHeight = collapseRef.current.offsetHeight
      const childHeight = collapseRef.current.firstChild.offsetHeight
      return childHeight > collapseMaxHeight
    }
    const handler = () => {
      const show = buttonIsNecessary()
      setShowCollapseButton(show)
      setCollapsed(show)
    }
    handler()
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
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
      style={{ maxHeight: !collapsed && showCollapseButton ? 'max-content' : '' }}
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
