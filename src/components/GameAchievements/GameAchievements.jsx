import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import classes from './GameAchievements.module.css'
import { randomPriceString } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import Button from '../Button/Button'
import React, { useEffect, useState } from 'react'
import Collapsable from '../Collapsable/Collapsable'
import Rating from '../Rating/Rating'

function justEnglishDescription (description) {
  description = description.replaceAll('<br />', '<br /><br />')
  return description.split('Español')[0]
}

const GameAchievements = () => {
  const { game, achievements } = useRouteLoaderData('showGame')
  console.log(game)
  const [nextPage, setNextPage] = useState(achievements.next)
  const [allAchievements, setAllAchievements] = useState(achievements.results)

  async function handleClick () {
    const res = await fetch(nextPage)
    const newAchievements = await res.json()
    setNextPage(newAchievements.next)
    setAllAchievements([...allAchievements, ...newAchievements.results])
  }

  return (
    <article className={classes.container}>
      <section className={classes.achievementsHero}>
        <img src={game.background_image} alt='Game Background Image' />
        <p>
          <span>Available achievements</span>
          <span>{achievements.count} Achievements</span>
        </p>
      </section>
      <main>
        <h3>
          Achievements <span>({achievements.count})</span>
        </h3>
        <section className={classes.achievementsContainer}>
          {allAchievements.map((achievement) => {
            return (
              <div key={achievement.id} className={classes.achievementCard}>
                <img src={achievement.image} alt='Achievemenet image' />
                <div>
                  <h4 className='break_lines'>{achievement.name}</h4>
                  <p className='break_lines break_lines--three'>
                    {achievement.description}
                  </p>
                </div>
              </div>
            )
          })}
        </section>

        {nextPage !== null && (
          <Button onClick={handleClick} size='large' bgColor='gray'>
            Show more
          </Button>
        )}
      </main>
    </article>
  )
}

export default GameAchievements
