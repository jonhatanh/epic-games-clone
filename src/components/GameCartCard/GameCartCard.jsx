import classes from './GameCartCard.module.css'
import { Link } from 'react-router-dom'

const GameCartCard = ({ game, children }) => {
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
                  game.tags.length - 1 === index ? tag.name : `${tag.name}, `
                return tags
              }, '')}
            </p>
          </div>
        </section>
      </main>
      <footer>{children}</footer>
    </article>
  )
}
export default GameCartCard
