import { useState } from 'react'
import styles from './App.module.css'
import { Link, Outlet } from 'react-router-dom'
import NavLink from './components/NavLink/NavLink'

function App () {
  return (
    <div className={styles.container}>
      <div className={styles.containerBackground} />
      <div className={styles.containerBody}>
        <header className={styles.containerHeader}>
          <h1>GAME STORE</h1>
          <nav>
            <ul className={styles.containerNav}>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='store'>Store</NavLink></li>
              <li><NavLink to='profile'>Profile</NavLink></li>
            </ul>
          </nav>
        </header>
        <main className={styles.containerMain}>
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default App
