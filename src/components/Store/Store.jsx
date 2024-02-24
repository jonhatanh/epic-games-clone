import { Link, useLoaderData } from 'react-router-dom';
import exampleImg from '../../assets/exampleImage.avif';
import classes from './Store.module.css';
import { useState } from 'react';
import { randomPriceString } from '../../helpers';

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
    <div className=''>
      {/* Nav store */}
      <nav className={classes.nav}>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search store'
          className={classes.searchBar}
        />
        <Link className={classes.link} to='discover'>
          Discover
        </Link>
        <Link className={classes.link} to='browse'>
          Browse
        </Link>
      </nav>
      <section className={classes.storeMain}>
        {/* best last six months */}
        <article className={classes.heroGames}>
          <div className={classes.mainGame}>
            <img
              src={game1.background_image}
              alt={`${game1.name} background image`}
            />
            <div className={classes.options}>
              <h3>{game1.name}</h3>
              <span>{randomPriceString()}</span>
              <button>Buy Now</button>
              <button>Add to wishlist</button>
            </div>
          </div>
          <div className={classes.sideGames}>
            {returnCopies(game1, 6).map((game, index) => {
              return (
                <div key={index} className={classes.cardHero}>
                  <img
                    src={game.background_image}
                    alt={`${game.name} background image`}
                  />
                  <h3>{game.name}</h3>
                </div>
              )
            })}
          </div>
        </article>

        {/* bY META CRITIC  this year */}
        <article className={classes.listOfGamesHorizontal}>
          {returnCopies(game2, 6).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>
          })}
        </article>

        {/* random games and last 30 days */}
        <article className={classes.listOfGamesVertical}>
          {returnCopies(game1, 15).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>
          })}
        </article>

        {/* all time best */}
        <article className={classes.listOfGamesHorizontal}>
          {returnCopies(game2, 6).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>
          })}
        </article>
      </section>
    </div>
  )
};

export default Store
