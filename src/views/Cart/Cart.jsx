import { useLoaderData } from 'react-router-dom'
import classes from './Cart.module.css'
import { useContext } from 'react'
import { StorageContext } from '../../App'
import GameCartCard from '../../components/GameCartCard/GameCartCard'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'
import { parsePrice } from '../../utils/helpers'

const toastCheckOutForm = (t) => {
  console.log(t)
  return (
    <div className={classes.toastCheckout}>
      <p>Do you want to confirm this purchase?</p>
      <footer>
        <Button bgColor='gray' onClick={() => toast.dismiss(t.id)}>
          Maybe later...
        </Button>
        <Button
          bgColor='blue'
          onClick={() => {
            t.onConfirm()
            toast.dismiss(t.id)
          }}
        >
          Go ahead 🤘
        </Button>
      </footer>
    </div>
  )
}
const Cart = () => {
  const { games } = useLoaderData()
  const { addGame, removeGame, idsStorage, gameInStorage, buyGamesInCart } =
    useContext(StorageContext)

  const total = games.reduce((sum, game) => sum + game.price, 0)

  function handlePurchase () {
    buyGamesInCart()
    toast.success('Games added to your library!')
  }
  return (
    <div className={classes.container}>
      <h2>
        Cart <span>({idsStorage.cart.length})</span>
      </h2>
      <main>
        <section>
          {games.map((game) => {
            if (!gameInStorage(game.id, 'cart')) return null
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
                    addGame(game.id, 'wishlist')
                    toast.success('Moved to wishlist')
                  }}
                >
                  Move to wishlist
                </Button>
              </GameCartCard>
            )
          })}
        </section>
        {idsStorage.cart.length > 0 && (
          <aside>
            <h3>Summary</h3>
            <p>
              <span>Price:</span>
              <span>{parsePrice(total)}</span>
            </p>
            <Button
              bgColor='blue'
              size='large'
              onClick={() =>
                toast(toastCheckOutForm, {
                  id: 'checkout',
                  duration: Infinity,
                  onConfirm: () => handlePurchase()
                })}
            >
              Check out
            </Button>
          </aside>
        )}
      </main>
    </div>
  )
}

export default Cart
