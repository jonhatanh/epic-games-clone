import { useLoaderData } from 'react-router-dom'
import GamesHorizontal from '@/components/GamesHorizontal/GamesHorizontal'
import GamesHorizontalBig from '@/components/GamesHorizontal/GamesHorizontalBig'
import GamesVertical from '@/components/GamesVertical/GamesVertical'
import Hero from '../HeroSection/HeroSection'
import classes from './DiscoverPage.module.css'
import { GameDetailsType, GameType } from '@/types/rawApiResponses'

type DiscoverPageData = {
  heroGames: GameType[];
  lastYear: GameType[];
  newGames: GameType[];
  randomGames: GameType[];
  gamesILike: GameDetailsType[];
}

export default function DiscoverPage () {
  const { heroGames, lastYear, newGames, randomGames, gamesILike } = useLoaderData() as DiscoverPageData
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
