import {
  Link,
  Navigate,
  useOutletContext,
  useRouteLoaderData
} from 'react-router-dom'
import classes from './GameOverview.module.css'
import { randomPriceString } from '@/utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCircleMinus,
  faCirclePlus,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/Button/Button'
import React, { useContext } from 'react'
import Collapsable from '@/components/Collapsable/Collapsable'
import GameGallery from '@/views/Store/views/ShowGame/GameGallery/GameGallery'
import { StorageContext } from '../../../../../App'
import ActionStorageButton from '../../../../../components/ActionStorageButton/ActionStorageButton'
function justEnglishDescription (description) {
  description = description.replaceAll('<br />', '<br /><br />')
  return description.split('Español')[0]
}

const GameOverview = () => {
  const { game, achievements, screenshots, movies } =
    useRouteLoaderData('showGame')

  const { addGame, removeGame, gameInStorage } = useContext(StorageContext)
  const gameInCart = gameInStorage(game.id, 'cart')
  const gameInWishlist = gameInStorage(game.id, 'wishlist')
  const gameInLibrary = gameInStorage(game.id, 'library')
  return (
    <>
      <section className={classes.gameDetails}>
        {/* Game Info */}
        <article>
          {/* Media Player */}
          <GameGallery allMedia={movies.concat(screenshots)} />
          <section className={classes.gameExtras}>
            <Collapsable>
              <div className={classes.genreTags}>
                <span>Genres</span>
                <div>
                  {game.genres.map((genre, index) => {
                    const lastItem = game.genres.length - 1 === index
                    return (
                      <React.Fragment key={genre.id}>
                        <Link>{genre.name}</Link>
                        {lastItem ? '' : ', '}
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
            </Collapsable>
            <Collapsable>
              <div className={classes.genreTags}>
                <span>Tags</span>
                <div>
                  {game.tags.map((tags, index) => {
                    const lastItem = game.tags.length - 1 === index
                    return (
                      <React.Fragment key={tags.id}>
                        <Link>{tags.name}</Link>
                        {lastItem ? '' : ', '}
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
            </Collapsable>
          </section>
          <Collapsable size='large'>
            <div
              className={classes.gameDescription}
              dangerouslySetInnerHTML={{
                __html: justEnglishDescription(game.description)
              }}
            />
          </Collapsable>
        </article>
        {/* Game checkout */}
        <aside>
          <img src={game.background_image} alt='Game Background Image' />
          <span>{game.price}</span>
          <ActionStorageButton
            size='large'
            bgColor='blue'
            link={gameInLibrary}
            to='/store/library'
            storageName='library'
            gameId={game.id}
            removeDefaultClick
          >
            {gameInLibrary ? 'In library' : 'Buy Now'}
          </ActionStorageButton>
          {/* <Button
            size='large'
            bgColor='blue'
            link={gameInLibrary}
            to='/store/library'
            onClick={() => (gameInLibrary ? '' : addGame(game.id, 'library'))}
          >
            {gameInLibrary ? 'In library' : 'Buy Now'}
          </Button> */}
          <ActionStorageButton
            storageName='cart'
            gameId={game.id}
            autoText
            border
            size='large'
          />
          <ActionStorageButton
            storageName='wishlist'
            gameId={game.id}
            autoText
            border
            size='large'
            icon={{ positive: faCirclePlus, negative: faCircleMinus }}
          />
          <div>
            <span>Publisher</span>
            <span>{game.publishers[0].name}</span>
          </div>
          <div>
            <span>Release Date</span>
            <span>{game.released}</span>
          </div>
        </aside>
      </section>
      {achievements.count > 0 && (
        <section>
          {/* Achievements section */}
          <section className={classes.achievementsContainer}>
            <h5>Available Achievements</h5>
            <div>
              {achievements.results.map((achievement) => {
                return (
                  <div key={achievement.id} className={classes.achievementCard}>
                    <img src={achievement.image} alt='Achievemenet image' />
                    <h4 className='break_lines'>{achievement.name}</h4>
                    <p className='break_lines break_lines--three'>
                      {achievement.description}
                    </p>
                  </div>
                )
              })}
            </div>
            <Button size='large' bgColor='gray' link to='achievements'>
              See All {achievements.count} Achievements
            </Button>
          </section>
        </section>
      )}
      {/* <Rating rating={game.rating} /> */}
    </>
  )
}

export default GameOverview
