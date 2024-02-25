import { Link, useLoaderData } from 'react-router-dom'
import exampleImg from '../../assets/exampleImage.avif'
import classes from './Store.module.css'
import { useState } from 'react'
import { randomPriceString } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
  const game2 = heroGames.results[1]
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
        <Link className={classes.link} to="discover">
          Discover
        </Link>
        <Link className={classes.link} to="browse">
          Browse
        </Link>
      </nav>
      <section className={classes.storeMain}>
        {/* best last six months */}
        <article className={classes.heroGames}>
          <div className={classes.mainGame}>
            <div className={classes.imageShadow} />
            <img
              src={game1.background_image}
              alt={`${game1.name} background image`}
            />
            <div className={classes.options}>
              <h3>{game1.name}</h3>
              <p className={classes.price}>
                Starting at <span>{randomPriceString()}</span>
              </p>
              <div>
                <button className={`${classes.button} ${classes.buttonWhite}`}>
                  Buy Now
                </button>
                <button
                  className={`${classes.button} ${classes.buttonTransparent}`}
                >
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
          {/* <div className={classes.sideGames}> */}
          {returnCopies(game1, 6).map((game, index) => {
            return (
              <div key={index} className={classes.cardHero}>
                <img
                  src={game.background_image}
                  alt={`${game.name} background image`}
                />
                <h3>{game.name}</h3>
              </div>
            );
          })}
          {/* </div> */}
        </article>

        {/* bY META CRITIC  this year */}
        <article className={classes.listOfGamesHorizontal}>
          <header>
            <h2>
              Best Of This Year
              <span>
                <FontAwesomeIcon
                  className={classes.centerIcon}
                  icon={faChevronRight}
                />
              </span>
            </h2>
            <div>
              <button className={classes.buttonCircular}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className={classes.buttonCircular}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </header>
          <div className={classes.cardContainer}>
            {returnCopies(game2, 6).map((game, index) => {
              return (
                <div key={index}>
                  <img
                    src={game.background_image}
                    alt={`${game.name} background image`}
                  />
                  <h3>{game.name}</h3>
                  <span>{randomPriceString()}</span>
                </div>
              );
            })}
          </div>
        </article>

        {/* random games and last 30 days */}
        <article className={classes.listOfGamesVertical}>
          <div className={classes.listTitle}>
            <h2>New Releases</h2>
            <FontAwesomeIcon
              className={classes.centerIcon}
              icon={faChevronRight}
            />
          </div>
          <div className={`${classes.listTitle} ${classes.listTitleDouble}`}>
            <h2>Random Games</h2>
            <FontAwesomeIcon
              className={classes.centerIcon}
              icon={faChevronRight}
            />
          </div>
          <div className={classes.verticalList}>
            {returnCopies(game1, 5).map((game, index) => {
              return (
                <div key={index} className={classes.cardHero}>
                  <img
                    src={game.background_image}
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
          <div
            className={`${classes.verticalList} ${classes.verticalListDouble}`}
          >
            {returnCopies(game2, 10).map((game, index) => {
              return (
                <div key={index} className={classes.cardHero}>
                  <img
                    src={game.background_image}
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
        </article>

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
            <div>
              <button className={classes.buttonCircular}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className={classes.buttonCircular}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </header>
          <div className={`${classes.cardContainer} ${classes.cardContainerGrid}`}>
            {returnCopies(game2, 6).map((game, index) => {
              return (
                <div key={index}>
                  <img
                    src={game.background_image}
                    alt={`${game.name} background image`}
                  />
                  <h3>{game.name}</h3>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, sequi iusto aliquam provident aliquid ex incidunt ullam rerum perferendis quisquam velit labore eius quidem inventore, aspernatur magni. Ratione, minus facilis?</p>
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
