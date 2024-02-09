import { useState } from 'react'
import styles from './App.module.css'
import { Link, Outlet } from 'react-router-dom'

function App () {
  return (
    <div className={styles.container}>
      <div className={styles.containerBackground} />
      <div className={styles.containerBody}>
        <header className={styles.containerHeader}>
          <h1>GAME STORE</h1>
          <nav>
            <ul className={styles.containerNav}>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='store'>Store</Link></li>
              <li><Link to='profile'>Profile</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default App
