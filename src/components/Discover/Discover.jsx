import { useLoaderData } from 'react-router-dom'
import GamesHorizontal from '../GamesHorizontal/GamesHorizontal'
import GamesHorizontalBig from '../GamesHorizontal/GamesHorizontalBig'
import GamesVertical from '../GamesVertical/GamesVertical'
import Hero from '../Hero/Hero'
import classes from './Discover.module.css'
export default function Discover () {
  const { heroGames } = useLoaderData()

  return (
    <section className={classes.discover}>
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
  )
}
