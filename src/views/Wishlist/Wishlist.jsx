import { Link, useLoaderData } from 'react-router-dom';
import classes from './Wishlist.module.css';
import Button from '../../components/Button/Button';
import { useContext } from 'react';
import { StorageContext } from '../../App';
import toast from 'react-hot-toast';
const Wishlist = () => {
  const { games } = useLoaderData()
  const { addGame, removeGame, gameInStorage, idsStorage } = useContext(StorageContext)
  return (
    <div className={classes.container}>
      <h2>Wishlist <span>({idsStorage.wishlist.length})</span></h2>
      <section>
        {games.map((game) => {
          const gameInCart = gameInStorage(game.id, 'cart')
          return (
            <article key={game.id} className={classes.card}>
              <main>
                <div>
                  <img src={game.background_image} alt={`${game.name} Image`} />
                  <ul>
                    <p>Game platforms</p>
                    {game.parent_platforms.map(({ platform: { id, name } }) => {
                      return <li key={id}>{name}</li>
                    })}
                  </ul>
                </div>
                <section className={classes.cardBody}>
                  <header>
                    <h3>
                      <Link to={`/store/games/${game.id}`}>{game.name}</Link>
                    </h3>
                    <span>{game.price}</span>
                  </header>
                  <div>
                    <span>ESRB Rating: {game.esrb_rating.name}</span>
                    <p>
                      {game.tags.reduce((tags, tag, index) => {
                        tags +=
                          game.tags.length - 1 === index
                            ? tag.name
                            : `${tag.name}, `
                        return tags
                      }, '')}
                    </p>
                  </div>
                </section>
              </main>
              <footer>
                <Button
                  onClick={() => {
                    removeGame(game.id, 'wishlist')
                    toast.success('Game removed from wishlist')
                  }}
                >
                  Remove
                </Button>
                <Button
                  link={gameInCart}
                  to='/cart'
                  border
                  onClick={() => {
                    addGame(game.id, 'cart')
                    toast.success('Game added to cart')
                  }}
                >
                  {gameInCart ? 'See in cart' : 'Add to cart'}
                </Button>
              </footer>
            </article>
          )
        })}
      </section>
    </div>
  )
};

export default Wishlist
