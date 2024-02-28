import classes from './GamesHorizontal.module.css';
import globalClasses from './../../Global.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { randomPriceString } from '../../helpers';
import HeroMainGame from '../HeroMainGame/HeroMainGame';
import { useEffect, useRef, useState } from 'react';
import GameCard from '../GameCard/GameCard';
const GamesHorizontal = ({ games }) => {
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true)
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false)
  const gamesContainerRef = useRef(null)
  const scrollEndRef = useRef(null)
  function moveScrollBar (moveToRight) {
    const percentOfTotal = gamesContainerRef.current.scrollWidth * 0.3
    const pxMovedLeft = gamesContainerRef.current.scrollLeft
    const pxToMove = moveToRight
      ? pxMovedLeft + percentOfTotal
      : pxMovedLeft - percentOfTotal
    gamesContainerRef.current.scrollTo(pxToMove, 0)
  }

  function checkButtonStatus (e) {
    if (scrollEndRef.current === null) {
      scrollEndRef.current = setTimeout(() => {
        console.log('chekcing', e)
        const leftButtonIsDisabled =
          gamesContainerRef.current?.scrollLeft === 0
        const rightButtonIsDisabled =
          gamesContainerRef.current?.scrollLeft +
            gamesContainerRef.current?.clientWidth ===
          gamesContainerRef.current?.scrollWidth
        setLeftButtonDisabled(leftButtonIsDisabled)
        setRightButtonDisabled(rightButtonIsDisabled)
        scrollEndRef.current = null
      }, 500)
    }
  }

  return (
    <article className={classes.listOfGamesHorizontal}>
      <header>
        <h2>
          Best Of This Year
          <span>
            <FontAwesomeIcon
              className={globalClasses.centerIcon}
              icon={faChevronRight}
            />
          </span>
        </h2>
        <div>
          <button
            className={`${globalClasses.buttonCircular} ${
              leftButtonDisabled && globalClasses.disabled
            }`}
            onClick={() => moveScrollBar(false)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={`${globalClasses.buttonCircular} ${
              rightButtonDisabled && globalClasses.disabled
            }`}
            onClick={() => moveScrollBar(true)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </header>
      <div
        ref={gamesContainerRef}
        className={globalClasses.cardContainer}
        onScroll={(e) => checkButtonStatus(e)}
      >
        {games.map((game, index) => {
          return (
            <GameCard
              key={game.id}
              game={game}
              showPrice
              breakLines='three'
              cardSize='small'
            />
          )
        })}
      </div>
    </article>
  )
};

GamesHorizontal.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default GamesHorizontal
