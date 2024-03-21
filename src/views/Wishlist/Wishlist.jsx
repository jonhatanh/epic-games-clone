import { useLoaderData } from 'react-router-dom'
import classes from './Wishlist.module.css'
import { useContext } from 'react'
import { StorageContext } from '../../App'
import GameCartCard from '../../components/GameCartCard/GameCartCard'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'
const Wishlist = () => {
  const { games } = useLoaderData()
  const { addGame, removeGame, gameInStorage, idsStorage } =
    useContext(StorageContext)

  return (
    <div className={classes.container}>
      <h2>
        Wishlist <span>({idsStorage.wishlist.length})</span>
      </h2>
      <section>
        {games.map((game) => {
          const gameInCart = gameInStorage(game.id, 'cart')
          if (!gameInStorage(game.id, 'wishlist')) return null
          return (
            <GameCartCard key={game.id} game={game}>
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
                  if (!gameInCart) {
                    addGame(game.id, 'cart')
                    toast.success('Game added to cart')
                  }
                }}
              >
                {gameInCart ? 'See in cart' : 'Add to cart'}
              </Button>
            </GameCartCard>
          )
        })}
      </section>
    </div>
  )
}

export default Wishlist
