import { useRouteLoaderData } from 'react-router-dom'
import GenreCard from '@/components/GenreCard/GenreCard.tsx'
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll'
import { BrowsePageLoaderType } from '../BrowsePage/BrowsePage'

const GameGenres = () => {
  const { genres } = useRouteLoaderData('BrowsePage') as BrowsePageLoaderType

  return (
    <HorizontalScroll title='Game Genres'>
      {genres.results.map((genre) => {
        return <GenreCard key={genre.id} genre={genre} />
      })}
    </HorizontalScroll>
  )
}

export default GameGenres
