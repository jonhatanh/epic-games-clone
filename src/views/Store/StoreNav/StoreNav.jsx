import { Link, NavLink } from 'react-router-dom'
import classes from './StoreNav.module.css'
export default function StoreNav () {
    const navClass = ({ isActive, isPending }) =>
      isActive ? classes.active : isPending ? "" : "";
  return (
    <nav className={classes.nav}>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search store'
        className={classes.searchBar}
      />
      <NavLink className={navClass} to='.' end>
        Discover
      </NavLink>
      <NavLink className={navClass} to='browse'>
        Browse
      </NavLink>
    </nav>
  )
}
