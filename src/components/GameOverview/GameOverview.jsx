import { Link, useLoaderData } from 'react-router-dom'
import classes from './GameOverview.module.css'
import { randomPriceString } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button'
import React from 'react'
import Collapsable from '../Collapsable/Collapsable'

function justEnglishDescription (description) {
  description = description.replaceAll('<br />', '<br /><br />')
  return description.split('Español')[0]
}

const GameOverview = () => {
  const { game, achievements } = useLoaderData()
  console.log(game)
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{game.name}</h1>
      <nav>
        <ul>
          <li className={classes.active}>Overview</li>
          <li>Logros</li>
        </ul>
      </nav>
      <div className={classes.gameDetails}>
        {/* Game Info */}
        <main>
          {/* Media Player */}
          <div className={classes.galleryContainer}>
            <div className={classes.mainImage}>
              <img src={game.background_image} alt='Game Image' />
            </div>
            <div className={classes.gallery}>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div>
                <img
                  className={classes.active}
                  src={game.background_image}
                  alt='Game Image'
                />
                <img src={game.background_image} alt='Game Image' />
                <img src={game.background_image} alt='Game Image' />
              </div>
              <button>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <div className={classes.gameExtras}>
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
          </div>
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
          </section>
        </main>
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
        </aside>
      </div>
      <div>{/* Archivements */}</div>
      <div>{/* Sistem req */}</div>
    </div>
  )
}

export default GameOverview
