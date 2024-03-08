import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import classes from './ShowGame.module.css'
const ShowGame = () => {
  const { game } = useLoaderData()

  const navClass = ({ isActive, isPending }) =>
    isActive ? classes.active : isPending ? '' : ''
  return (
    <article className={classes.container}>
      <h1 className={classes.title}>{game.name}</h1>
      <nav>
        <ul>
          <li>
            <NavLink className={navClass} to='.' end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink className={navClass} to='achievements'>Achievements</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </article>
  )
}

export default ShowGame
