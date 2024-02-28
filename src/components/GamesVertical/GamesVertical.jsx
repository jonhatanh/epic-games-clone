import classes from './GamesVertical.module.css'
import globalClasses from './../../Global.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { randomPriceString } from '../../helpers'
import HeroMainGame from '../HeroMainGame/HeroMainGame'
import { useEffect, useRef, useState } from 'react'
const GamesVertical = ({ randomGames, recentGames }) => {
  return (
    <article className={classes.listOfGamesVertical}>
      <div className={classes.listTitle}>
        <h2>New Releases</h2>
        <FontAwesomeIcon className={classes.centerIcon} icon={faChevronRight} />
      </div>
      <div className={`${classes.listTitle} ${classes.listTitleDouble}`}>
        <h2>Random Games</h2>
        <FontAwesomeIcon className={classes.centerIcon} icon={faChevronRight} />
      </div>
      <div className={classes.verticalList}>
        {recentGames.map((game, index) => {
          return (
            <div
              key={index}
              className={`${globalClasses.cardHero} ${classes.cardHeroSmall}`}
            >
              <img
                src={game.background_image || "/assets/default_image.png"}
                alt={`${game.name} background image`}
              />
              <div>
                <h3>{game.name}</h3>
                <span>{randomPriceString()}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${classes.verticalList} ${classes.verticalListDouble}`}>
        {randomGames.map((game, index) => {
          return (
            <div key={index} className={`${globalClasses.cardHero} ${classes.cardHeroSmall}`}>
              <img
                src={game.background_image || '/assets/default_image.png'}
                alt={`${game.name} background image`}
              />
              <div>
                <h3>{game.name}</h3>
                <span>{randomPriceString()}</span>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

GamesVertical.propTypes = {
  randomGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default GamesVertical
