import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import classes from './ShowGame.module.css'
import { ShowGameLoaderType } from './ShowGameLoader'
const ShowGame = () => {
  const { game } = useLoaderData() as ShowGameLoaderType

  const navClass = ({ isActive, isPending }: { isActive: boolean, isPending: boolean}) =>
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
