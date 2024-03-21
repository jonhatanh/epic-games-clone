import classes from './App.module.css'
import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation
} from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faGamepad,
  faHome,
  faMeteor,
  faShop,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import { Toaster } from 'react-hot-toast'
import { library } from '@fortawesome/fontawesome-svg-core'

export const StorageContext = createContext({
  cart: [],
  wishlist: [],
  library: []
})

function App () {
  const currentRoute = useLocation()
  const darkBody = currentRoute.pathname !== '/'
  const [openNav, setOpenNav] = useState(false)

  const [idsStorage, setIdsStorage] = useState(() => {
    const storage = localStorage.getItem('idsStorage')
    return storage
      ? JSON.parse(storage)
      : {
          cart: [],
          wishlist: [],
          library: []
        }
  })
  function addGame (gameId, category) {
    console.log({ gameId, category, idsStorage })
    if (idsStorage[category].includes(gameId)) return
    const newCategory = [...idsStorage[category], gameId]
    setIdsStorage((latestStorage) => ({
      ...latestStorage,
      [category]: newCategory
    }))
  }
  function removeGame (gameId, category) {
    const newCategory = idsStorage[category].filter((id) => id !== gameId)
    setIdsStorage((latestStorage) => ({
      ...latestStorage,
      [category]: newCategory
    }))
  }
  function gameInStorage (gameId, category) {
    console.log({ gameId, category, idsStorage })
    return idsStorage[category].includes(gameId)
  }
  function buyGamesInCart () {
    const newWishlist = idsStorage.wishlist.filter(
      (gameId) => !idsStorage.cart.includes(gameId)
    )
    setIdsStorage((latestStorage) => ({
      wishlist: newWishlist,
      cart: [],
      library: [...latestStorage.library, ...latestStorage.cart]
    }))
  }

  useEffect(() => {
    localStorage.setItem('idsStorage', JSON.stringify(idsStorage))
  }, [idsStorage])

  const navClass = ({ isActive, isPending }) =>
    isActive ? classes.active : ''

  return (
    <div className={classes.container}>
      <Toaster />
      <div
        className={`${classes.containerBackground} ${
          darkBody && classes.containerBackgroundDark
        }`}
      />
      <div className={classes.containerBody}>
        <header className={classes.containerHeader}>
          <h1>GAME STORE</h1>
          <nav>
            <button onClick={()=> setOpenNav(!openNav)}><FontAwesomeIcon icon={faBars}/></button>
            <ul className={`${classes.containerNav} ${openNav ? classes.open : ''}`}>
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
                <NavLink to='/wishlist' className={navClass}>
                  <FontAwesomeIcon icon={faMeteor} />
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink to='/cart' className={navClass}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Cart
                  <span>{idsStorage.cart.length}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/library' className={navClass}>
                  <FontAwesomeIcon icon={faGamepad} />
                  Library
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className={classes.containerMain}>
          <StorageContext.Provider
            value={{
              idsStorage,
              addGame,
              removeGame,
              gameInStorage,
              buyGamesInCart
            }}
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
