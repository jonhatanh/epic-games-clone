import classes from './App.module.css'
import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation
} from 'react-router-dom'
import { createContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faShop,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'

export const StorageContext = createContext({
  cart: [],
  wishlist: [],
  library: []
})
function App () {
  const currentRoute = useLocation()
  const darkBody = currentRoute.pathname !== '/'

  const [idsStorage, setIdsStorage] = useState({
    cart: [],
    wishlist: [],
    library: []
  })
  function addGame (gameId, category) {
    const newCategory = [...idsStorage[category], gameId]
    setIdsStorage({ ...idsStorage, [category]: newCategory })
  }
  function removeGame (gameId, category) {
    const newCategory = idsStorage[category].filter((id) => id !== gameId)
    setIdsStorage({ ...idsStorage, [category]: newCategory })
  }
  function gameInStorage (gameId, category) {
    return idsStorage[category].findIndex(id => id === gameId) !== -1
  }

  const navClass = ({ isActive, isPending }) =>
    isActive ? classes.active : ''

  return (
    <div className={classes.container}>
      <div
        className={`${classes.containerBackground} ${
          darkBody && classes.containerBackgroundDark
        }`}
      />
      <div className={classes.containerBody}>
        <header className={classes.containerHeader}>
          <h1>GAME STORE</h1>
          <nav>
            <ul className={classes.containerNav}>
              <li>
                <NavLink to='/' className={navClass}>
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/store' className={navClass}>
                  <FontAwesomeIcon icon={faShop} />
                  Store
                </NavLink>
              </li>
              <li>
                <NavLink to='/cart' className={navClass}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Cart
                  <span>{idsStorage.cart.length}</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className={classes.containerMain}>
          <StorageContext.Provider
            value={{ idsStorage, addGame, removeGame, gameInStorage }}
          >
            <Outlet />
          </StorageContext.Provider>
        </main>
      </div>
      <ScrollRestoration
        getKey={(location, matches) => {
          const paths = ['/store']
          return paths.includes(location.pathname)
            ? // home and notifications restore by pathname
            location.pathname
            : // everything else by location like the browser
            location.key
        }}
      />
    </div>
  )
}

export default App
