import { Link } from 'react-router-dom'
import styles from './NavLink.module.css'

export default function NavLink ({ children, ...params }) {
  return (
    <Link className={styles.navLink} {...params}>
      {children}
    </Link>
  )
}
