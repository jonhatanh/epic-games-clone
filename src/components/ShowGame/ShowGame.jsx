import { Link, Outlet, useLoaderData } from 'react-router-dom'
import classes from './ShowGame.module.css'
import { randomPriceString } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import Button from '../Button/Button'
import React from 'react'
import Collapsable from '../Collapsable/Collapsable'
import Rating from '../Rating/Rating'

function justEnglishDescription (description) {
  description = description.replaceAll('<br />', '<br /><br />')
  return description.split('Español')[0]
}

const ShowGame = () => {
  const { game } = useLoaderData()
  console.log(game)
  return (
    <article className={classes.container}>
      <h1 className={classes.title}>{game.name}</h1>
      <nav>
        <ul>
          <li className={classes.active}><Link to=".">Overview</Link></li>
          <li><Link to="achievements">Achievements</Link></li>
        </ul>
      </nav>
      <Outlet />
    </article>
  );
}

export default ShowGame
