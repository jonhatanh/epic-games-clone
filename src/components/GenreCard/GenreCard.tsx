import { Link } from 'react-router-dom'
import classes from './GenreCard.module.css'
import { GenreApiResponse } from '@/types'

const GenreCard = ({
  genre: { name, slug, image_background: backgroundImage }
}: {genre: GenreApiResponse}) => {
  return (
    <Link className={`${classes.card}`} to={`/store/genre/${slug}`}>
      <img
        src={backgroundImage || '/assets/default_image.png'}
        alt={`${name} genre background image`}
      />
      <h5 className='break_lines'>{name}</h5>
    </Link>
  )
}

export default GenreCard
