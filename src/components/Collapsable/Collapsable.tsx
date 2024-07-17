import classes from './Collapsable.module.css'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

type CollapsableProps = {
  children: React.ReactElement;
  size?: 'small' | 'normal' | 'large';
}

const Collapsable = ({ children, size = 'normal' }: CollapsableProps) => {
  const [showCollapseButton, setShowCollapseButton] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const collapseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function buttonIsNecessary () {
      if (!collapseRef.current) return false
      const collapseMaxHeight = collapseRef.current.offsetHeight
      const containerChild = collapseRef.current.firstChild as HTMLElement
      if (!containerChild) return false
      const childHeight = containerChild.offsetHeight
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

export default Collapsable
