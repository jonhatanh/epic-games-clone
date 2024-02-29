import { Link } from 'react-router-dom'
import classes from './StoreNav.module.css'
export default function StoreNav () {
  return (
    <nav className={classes.nav}>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search store'
        className={classes.searchBar}
      />
      <Link className={`${classes.link} ${classes.linkActive}`} to='discover'>
        Discover
      </Link>
      <Link className={classes.link} to='browse'>
        Browse
      </Link>
    </nav>
  )
}
