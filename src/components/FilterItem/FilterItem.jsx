import { useState } from 'react'
import classes from './FilterItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

/**
 *
 * @TODO
 * Delete itemsContainerClass
 */
export default function FilterItem ({ title, children, itemsContainerClass }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`${classes.filterItem} ${open ? classes.open : ''}`}>
      <h6 onClick={() => setOpen(!open)}>
        {title}
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{ marginBottom: '2px', rotate: open ? '180deg' : '' }}
        />
      </h6>
      <ul className={itemsContainerClass}>{children}</ul>
    </article>
  )
}

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
  itemsContainerClass: PropTypes.string
}
