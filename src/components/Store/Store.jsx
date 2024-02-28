import { Link, useLoaderData } from 'react-router-dom'
import classes from './Store.module.css'
import Hero from '../Hero/Hero'
import GamesHorizontal from '../GamesHorizontal/GamesHorizontal'
import GamesVertical from '../GamesVertical/GamesVertical'
import GamesHorizontalBig from '../GamesHorizontal/GamesHorizontalBig'


const Store = () => {
  const { heroGames } = useLoaderData()
  return (
    <div className={classes.store}>
      {/* Nav store */}
      <nav className={classes.nav}>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search store'
          className={classes.searchBar}
        />
        <Link className={`${classes.link} ${classes.linkActive}`} to='discover'>
          Discover
        </Link>
        <Link className={classes.link} to='browse'>
          Browse
        </Link>
      </nav>
      <section className={classes.storeMain}>
        <Hero games={heroGames.results.slice(0, 6)} />

        {/* bY META CRITIC  this year */}
        <GamesHorizontal games={heroGames.results.slice(0, 16)} />

        {/* random games and last 30 days */}
        <GamesVertical
          recentGames={heroGames.results.slice(10, 15)}
          randomGames={heroGames.results.slice(0, 10)}
        />

        {/* all time best */}
        <GamesHorizontalBig games={heroGames.results.slice(0, 6)} />
      </section>
    </div>
  )
}

export default Store
