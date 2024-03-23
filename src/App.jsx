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
  faBars,
  faGamepad,
  faHome,
  faMeteor,
  faShop,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import { Toaster } from 'react-hot-toast'
import { StorageContext, useGamesStorage } from './hooks/useGamesStorage'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const NavItem = ({ children, to, icon }) => {
  const navClass = ({ isActive }) => (isActive ? classes.active : '')
  return (
    <NavLink to={to} className={navClass}>
      <FontAwesomeIcon icon={icon} />
      {children}
    </NavLink>
  )
}

function App () {
  const currentRoute = useLocation()
  const darkBody = currentRoute.pathname !== '/'
  const [openNav, setOpenNav] = useState(false)
  console.log({ currentRoute })
  const {
    idsStorage,
    addGame,
    removeGame,
    gameInStorage,
    buyGamesInCart,
    buySingleGame
  } = useGamesStorage()

  const homePage = currentRoute.pathname === '/'

  function handleClick (e) {
    if (e.target.nodeName === 'A') {
      setOpenNav(false)
    }
  }
  return (
    <div
      className={`${classes.container} ${homePage ? classes.innerShadow : ''}`}
    >
      <Toaster />
      <div
        className={`${classes.containerBackground} ${
          darkBody && classes.containerBackgroundDark
        }`}
      />
      <div className={classes.containerBody}>
        <header
          className={classes.containerHeader}
          style={{
            backgroundColor: homePage ? 'transparent' : ''
          }}
        >
          <h1>GAME STORE</h1>
          <nav>
            <button onClick={() => setOpenNav(!openNav)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <ul
              onClick={handleClick}
              className={`${classes.containerNav} ${
                openNav ? classes.open : ''
              }`}
            >
              <li>
                <NavItem to='/' icon={faHome}>
                  Home
                </NavItem>
              </li>
              <li>
                <NavItem to='store' icon={faShop}>
                  Store
                </NavItem>
              </li>
              <li>
                <NavItem to='wishlist' icon={faMeteor}>
                  Wishlist
                </NavItem>
              </li>
              <li>
                <NavItem to='cart' icon={faShoppingCart}>
                  Cart
                  <span>{idsStorage.cart.length}</span>
                </NavItem>
              </li>
              <li>
                <NavItem to='library' icon={faGamepad}>
                  Library
                </NavItem>
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
              buyGamesInCart,
              buySingleGame
            }}
          >
            <Outlet />
          </StorageContext.Provider>
        </main>
        <footer>
          Game Store - Made by{' '}
          <a href='https://github.com/jonhatanh'>
            jonhatanh <FontAwesomeIcon icon={faGithub} />
          </a>
        </footer>
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
