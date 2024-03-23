import { Link, NavLink } from 'react-router-dom'
import classes from './StoreNav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useSearchBar } from '@/hooks/useSearchBar'
import { useOutsideClick } from '@/hooks/useOutsideClick'
export default function StoreNav () {
  const navClass = ({ isActive, isPending }) =>
    isActive ? classes.active : isPending ? '' : ''

  const closeTabOnClickOutside = () => {
    handleOpenTab(false)
  }
  const tagRef = useOutsideClick(closeTabOnClickOutside)
  const { games, loading, error, handleChange, openTab, setOpenTab } =
    useSearchBar()

  function handleOpenTab (open) {
    if (open && (error || games?.length > 0)) {
      // if(open) {
      setOpenTab(true)
    } else {
      setOpenTab(false)
    }
  }

  return (
    <nav className={classes.nav}>
      <div ref={tagRef} className={classes.searchContainer}>
        <input
          type='search'
          placeholder='Search store'
          className={classes.searchBar}
          onChange={(e) => handleChange(e)}
          onFocus={() => handleOpenTab(true)}
          autoComplete='off'
        />
        <FontAwesomeIcon
          icon={faSpinner}
          className={`${loading ? classes.active : ''} fa-spin`}
        />
        <section className={openTab ? classes.open : ''}>
          {error && <p>{error}</p>}
          {games?.map((game) => {
            return (
              <Link
                key={game.id}
                to={`/store/games/${game.id}`}
                onClick={() => handleOpenTab(false)}
              >
                <img src={game.background_image} alt={`${game.name} cover`} />
                <h3>{game.name}</h3>
              </Link>
            )
          })}
        </section>
      </div>
      <NavLink className={navClass} to='.' end>
        Discover
      </NavLink>
      <NavLink className={navClass} to='browse'>
        Browse
      </NavLink>
    </nav>
  )
}
