import { useRouteLoaderData } from 'react-router-dom'
import classes from './GameAchievements.module.css'
import Button from '@/components/Button/Button'
import { useState } from 'react'

const GameAchievements = () => {
  const { game, achievements } = useRouteLoaderData('showGame')
  const [nextPage, setNextPage] = useState(achievements.next)
  const [allAchievements, setAllAchievements] = useState(achievements.results)

  async function handleClick () {
    const res = await fetch(nextPage, { mode: 'cors' })
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
