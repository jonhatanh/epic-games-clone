import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import classes from './GameGenres.module.css'
import GenreCard from '@/components/GenreCard/GenreCard';

const GameGenres = () => {
  const { genres } = useRouteLoaderData('BrowsePage')

  return (
    <section className={classes.genresContainer}>
      <h3>Game Genres</h3>
      <div className={classes.cardsContainer}>
        {
          genres.results.map(genre => {
            return (
              <GenreCard genre={genre} />
            )
          })
        }
      </div>
    </section>
  )
}

export default GameGenres
