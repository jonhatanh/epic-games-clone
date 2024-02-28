import { Link, useLoaderData } from 'react-router-dom'
import exampleImg from '../../assets/exampleImage.avif'
import classes from './Store.module.css'
import globalClasses from '../../Global.module.css'
import { useState } from 'react'
import { randomPriceString } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Hero from '../Hero/Hero'
import GamesHorizontal from '../GamesHorizontal/GamesHorizontal'
import GamesVertical from '../GamesVertical/GamesVertical'

function returnCopies (game, qty = 1) {
  const copies = []
  for (let i = 1; i <= qty; i++) {
    copies.push({ ...game })
  }
  return copies
}

const Store = () => {
  const { heroGames } = useLoaderData()
  const game1 = heroGames.results[0]
  console.log(heroGames)
  return (
    <div className={classes.store}>
      {/* Nav store */}
      <nav className={classes.nav}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search store"
          className={classes.searchBar}
        />
        <Link className={`${classes.link} ${classes.linkActive}`} to="discover">
          Discover
        </Link>
        <Link className={classes.link} to="browse">
          Browse
        </Link>
      </nav>
      <section className={classes.storeMain}>
        <Hero games={heroGames.results.slice(0, 6)} />

        {/* bY META CRITIC  this year */}
        <GamesHorizontal games={heroGames.results.slice(0, 16)} />

        {/* random games and last 30 days */}
        <GamesVertical
          recentGames={heroGames.results.slice(10, 15)}
          randomGames={heroGames.results.slice(0, 10)}
        />

        {/* all time best */}
        <article className={classes.listOfGamesHorizontal}>
          <header>
            <h2>
              Best Of All Time
              <span>
                <FontAwesomeIcon
                  className={classes.centerIcon}
                  icon={faChevronRight}
                />
              </span>
            </h2>
            {/* <div>
              <button className={classes.buttonCircular}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className={classes.buttonCircular}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div> */}
          </header>
          <div
            className={`${classes.cardContainer} ${classes.cardContainerThree}`}
          >
            {heroGames.results.slice(0, 6).map((game, index) => {
              return (
                <div key={index}>
                  <img
                    src={game.background_image || "/assets/default_image.png"}
                    alt={`${game.name} background image`}
                  />
                  <h3>{game.name}</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod, sequi iusto aliquam provident aliquid ex incidunt
                    ullam rerum perferendis quisquam velit labore eius quidem
                    inventore, aspernatur magni. Ratione, minus facilis?
                  </p>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Store
