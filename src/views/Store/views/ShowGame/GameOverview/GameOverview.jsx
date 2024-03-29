import { Link, useRouteLoaderData } from 'react-router-dom'
import classes from './GameOverview.module.css'
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/Button/Button'
import React, { useContext } from 'react'
import Collapsable from '@/components/Collapsable/Collapsable'
import GameGallery from '@/views/Store/views/ShowGame/GameGallery/GameGallery'
import { StorageContext } from '@/hooks/useGamesStorage'
import ActionStorageButton from '@/components/ActionStorageButton/ActionStorageButton'
function justEnglishDescription (description) {
  description = description.replaceAll('<br />', '<br /><br />')
  return description.split('Español')[0]
}

const GameOverview = () => {
  const { game, achievements, screenshots, movies } =
    useRouteLoaderData('showGame')

  const { gameInStorage } = useContext(StorageContext)
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
            to='/library'
            storageName='library'
            gameId={game.id}
          />
          <ActionStorageButton
            storageName='cart'
            gameId={game.id}
            border
            size='large'
          />
          <ActionStorageButton
            storageName='wishlist'
            gameId={game.id}
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
          <div>
            <span>ESRB Rating</span>
            <span>{game.esrb_rating?.name || 'Undefined'}</span>
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
    </>
  )
}

export default GameOverview
