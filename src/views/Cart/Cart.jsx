import { useLoaderData } from 'react-router-dom'
import classes from './Cart.module.css'
import { useContext } from 'react'
import { StorageContext } from '../../App'
import GameCartCard from '../../components/GameCartCard/GameCartCard'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'
const Cart = () => {
  const { games } = useLoaderData()
  const { removeGame, idsStorage } =
    useContext(StorageContext)

  return (
    <div className={classes.container}>
      <h2>
        Cart <span>({idsStorage.cart.length})</span>
      </h2>
      <section>
        {games.map((game) => {
          return (
            <GameCartCard key={game.id} game={game}>
              <Button
                onClick={() => {
                  removeGame(game.id, 'cart')
                  toast.success('Game removed from cart')
                }}
              >
                Remove
              </Button>
              <Button
                border
                onClick={() => {
                  removeGame(game.id, 'cart')
                  toast.success('Moved to wishlist')
                }}
              >
                Move to wishlist
              </Button>
            </GameCartCard>
          )
        })}
      </section>
    </div>
  )
}

export default Cart
