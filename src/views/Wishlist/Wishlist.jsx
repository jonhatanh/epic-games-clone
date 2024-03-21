import { Link, useLoaderData } from 'react-router-dom'
import classes from './Wishlist.module.css'
import Button from '../../components/Button/Button'
const Wishlist = () => {
  const { games } = useLoaderData()
  return (
    <div className={classes.container}>
      <h2>Wishlist</h2>
      <section>
        {games.map((game) => {
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
                        tags += game.tags.length - 1 === index
                          ? tag.name
                          : `${tag.name}, `
                        return tags
                      }, '')}
                    </p>
                  </div>
                </section>
              </main>
              <footer>
                <Button>Remove</Button>
                <Button border>Add to cart</Button>
              </footer>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default Wishlist
