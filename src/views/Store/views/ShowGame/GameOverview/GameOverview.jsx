import { Link, useRouteLoaderData } from 'react-router-dom'
import classes from './GameOverview.module.css'
import { randomPriceString } from '@/utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCirclePlus,
  faPlay
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import Button from '@/components/Button/Button'
import React from 'react'
import Collapsable from '@/components/Collapsable/Collapsable'
import Rating from '@/components/Rating/Rating'

function justEnglishDescription (description) {
  description = description.replaceAll('<br />', '<br /><br />')
  return description.split('Español')[0]
}

const GameOverview = () => {
  const { game, achievements, screenshots, movies } =
    useRouteLoaderData('showGame')
  console.log(game)
  return (
    <>
      <section className={classes.gameDetails}>
        {/* Game Info */}
        <article>
          {/* Media Player */}
          <section className={classes.galleryContainer}>
            <div className={classes.mainImage}>
              <img src={game.background_image} alt='Game Image' />
            </div>
            <div className={classes.gallery}>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div>
                {movies.map((movie) => {
                  return (
                    <div
                      key={movie.id}
                      className={`${classes.videoWrapper} ${classes.active}`}
                    >
                      <FontAwesomeIcon icon={faPlay} />
                      <img
                        src={movie.preview}
                        alt={movie.name + 'video preview'}
                      />
                    </div>
                  )
                })}
                {screenshots.results.map((screenshot) => {
                  return (
                    <img
                      key={screenshot.id}
                      className={classes.active}
                      src={screenshot.image}
                      alt='Game Image'
                    />
                  )
                })}
              </div>
              <button>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </section>
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
          <span>{randomPriceString()}</span>
          <Button size='large' bgColor='blue'>
            Buy Now
          </Button>

          <Button border size='large'>
            Add to cart
          </Button>
          <Button border size='large'>
            <FontAwesomeIcon icon={faCirclePlus} />
            Add to wishlist
          </Button>
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
      {/* <Rating rating={game.rating} /> */}
    </>
  )
}

export default GameOverview
