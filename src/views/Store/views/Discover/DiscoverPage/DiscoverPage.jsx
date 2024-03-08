import { useLoaderData } from 'react-router-dom'
import GamesHorizontal from '@/components/GamesHorizontal/GamesHorizontal'
import GamesHorizontalBig from '@/components/GamesHorizontal/GamesHorizontalBig'
import GamesVertical from '@/components/GamesVertical/GamesVertical'
import Hero from '../HeroSection/HeroSection'
import classes from './DiscoverPage.module.css';
export default function DiscoverPage () {
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
