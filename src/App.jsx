import styles from './App.module.css'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import NavLink from './components/NavLink/NavLink'

function App () {
  const currentRoute = useLocation()

  const darkBody = currentRoute.pathname !== '/'

  return (
    <div className={styles.container}>
      <div
        className={`${styles.containerBackground} ${
          darkBody && styles.containerBackgroundDark
        }`}
      />
      <div className={styles.containerBody}>
        <header className={styles.containerHeader}>
          <h1>GAME STORE</h1>
          <nav>
            <ul className={styles.containerNav}>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='store'>Store</NavLink>
              </li>
              <li>
                <NavLink to='profile'>Profile</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className={styles.containerMain}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration
        getKey={(location, matches) => {
          const paths = ['/store']
          console.log(location, matches)
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
