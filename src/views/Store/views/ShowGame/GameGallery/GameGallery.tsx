import classes from './GameGallery.module.css'
import { useState } from 'react'
import GalleryItems from './views/GalleryItems/GalleryItems.tsx'
import MainMedia from './views/MainMedia/MainMedia.tsx'
import { GameMedia } from '@/types'


type GameGalleryProps = {
  allMedia: GameMedia[]
}

const GameGallery = ({ allMedia }: GameGalleryProps) => {
  const [mainMediaId, setMainMediaId] = useState<number>(allMedia[0]?.id)

  function changeMediaId (id: number) {
    setMainMediaId(id)
  }

  return (
    <section className={classes.galleryContainer}>
      <MainMedia
        allMedia={allMedia}
        mainMediaId={mainMediaId}
        setMainMediaId={setMainMediaId}
      />
      <GalleryItems
        media={allMedia}
        mainMediaId={mainMediaId}
        changeMediaId={changeMediaId}
      />
    </section>
  )
}

export default GameGallery
