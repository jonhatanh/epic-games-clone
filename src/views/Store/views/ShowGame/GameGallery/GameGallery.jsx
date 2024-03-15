import { useRouteLoaderData } from 'react-router-dom'
import classes from './GameGallery.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import {
  faChevronLeft,
  faChevronRight,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import GalleryItems from './views/GalleryItems/GalleryItems'
import MainMedia from './views/MainMedia/MainMedia'

const GameGallery = ({ allMedia }) => {
  const [mainMediaId, setMainMediaId] = useState(allMedia[0]?.id)

  function changeMediaId (id) {
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

GameGallery.propTypes = {
  allMedia: PropTypes.arrayOf(PropTypes.object)
}

export default GameGallery
