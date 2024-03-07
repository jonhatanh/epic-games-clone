import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom'
import classes from './ShowGame.module.css'
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

  const navClass = ({ isActive, isPending }) =>
    isActive ? classes.active : isPending ? '' : ''
  return (
    <article className={classes.container}>
      <h1 className={classes.title}>{game.name}</h1>
      <nav>
        <ul>
          <li>
            <NavLink className={navClass} to='.' end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink className={navClass} to='achievements'>Achievements</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </article>
  )
}

export default ShowGame
