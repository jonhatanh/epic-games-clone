import { useLoaderData, useRouteLoaderData } from 'react-router-dom'
import classes from './GameGenres.module.css'
import GenreCard from '@/components/GenreCard/GenreCard'
import HorizontalScroll from '../../../../../components/HorizontalScroll/HorizontalScroll'

const GameGenres = () => {
  const { genres } = useRouteLoaderData('BrowsePage')

  return (
    <HorizontalScroll title='Game Genres' qtyOfItems={genres.length}>
      {genres.results.map((genre) => {
        return <GenreCard key={genre.id} genre={genre} />
      })}
    </HorizontalScroll>
  )
}

export default GameGenres
