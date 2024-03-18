import { useLoaderData } from 'react-router-dom'
import GamesHorizontal from '@/components/GamesHorizontal/GamesHorizontal'
import GamesHorizontalBig from '@/components/GamesHorizontal/GamesHorizontalBig'
import GamesVertical from '@/components/GamesVertical/GamesVertical'
import Hero from '../HeroSection/HeroSection'
import classes from './DiscoverPage.module.css'
export default function DiscoverPage () {
  const { heroGames, lastYear, newGames, randomGames, gamesILike } = useLoaderData()
  console.log({ heroGames, lastYear, newGames, randomGames, gamesILike });
  return (
    <section className={classes.discover}>
      <Hero games={heroGames} />

      {/* bY META CRITIC  this year */}
      <GamesHorizontal games={lastYear} />

      {/* random games and last 30 days */}
      <GamesVertical
        recentGames={newGames}
        randomGames={randomGames}
      />

      {/* all time best */}
      <GamesHorizontalBig games={gamesILike} />
    </section>
  )
}
