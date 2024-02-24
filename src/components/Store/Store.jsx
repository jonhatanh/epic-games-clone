import { Link, useLoaderData } from 'react-router-dom';
import exampleImg from '../../assets/exampleImage.avif';
import classes from './Store.module.css';
import { useState } from 'react';

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
    <div className="">
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
      <section className="">
        {/* last 30 days */}
        <article className={classes.heroGames}>
          {returnCopies(game1, 7).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>;
          })}
        </article>

        {/* bY META CRITIC  this year */}
        <article className={classes.listOfGamesHorizontal}>
          {returnCopies(game2, 6).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>;
          })}
        </article>

        {/* random games */}
        <article className={classes.listOfGamesVertical}>
          {returnCopies(game1, 15).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>;
          })}
        </article>

        {/* all time best */}
        <article className={classes.listOfGamesHorizontal}>
          {returnCopies(game2, 6).map((game) => {
            return <div className={classes.cardHero}>{game.name}</div>;
          })}
        </article>
      </section>
    </div>
  );
};

export default Store
