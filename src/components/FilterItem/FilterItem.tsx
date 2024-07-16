import { useState } from 'react'
import classes from './FilterItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
/**
 *
 * @TODO
 * Delete itemsContainerClass
 */

type FilterItemProps = {
  title: string;
  children: React.ReactNode;
  itemsContainerClass?: string;
}

export default function FilterItem ({ title, children, itemsContainerClass }: FilterItemProps) {
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
