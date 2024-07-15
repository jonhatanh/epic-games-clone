import { useLoaderData } from 'react-router-dom'
import classes from './Cart.module.css'
import { useContext } from 'react'
import { StorageContext } from '@/hooks/useGamesStorage'
import GameCartCard from '@/components/GameCartCard/GameCartCard'
import Button from '@/components/Button/Button'
import toast, { Toast } from 'react-hot-toast'
import { parsePrice } from '@/utils/helpers'
import Empty from '@/components/Empty/Empty'
import { GameDetailsType } from '@/types/rawApiResponses'

type ToastProps = Toast & {
  onConfirm?: () => void
}
type CustomToastProps = ToastProps & {
  onConfirm?: () => void
}
export function ToastCheckOutForm (t: ToastProps) {
  return (
    <div className={classes.toastCheckout}>
      <p>Do you want to confirm this purchase?</p>
      <footer className={classes.footer}>
        <Button bgColor='gray' onClick={() => toast.dismiss(t.id)}>
          Maybe later...
        </Button>
        <Button
          bgColor='blue'
          onClick={() => {
            if (t.onConfirm) t.onConfirm()
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
  const { games } = useLoaderData() as { games: GameDetailsType[] }
  const { addGame, removeGame, idsStorage, gameInStorage, buyGamesInCart } =
    useContext(StorageContext)

  const total = games.reduce((sum, game) => sum + Number(game.price), 0)

  function handlePurchase () {
    buyGamesInCart()
    toast.success('Games added to your library!')
  }
  return (
    <div className={classes.container}>
      <h2>
        Cart <span>({idsStorage.cart.length})</span>
      </h2>
      {idsStorage.cart?.length > 0
        ? (
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
                    toast(ToastCheckOutForm, {
                      id: 'checkout',
                      duration: Infinity,
                      onConfirm: () => handlePurchase()
                    } as CustomToastProps)}
                >
                  Check out
                </Button>
              </aside>
            )}
          </main>
          )
        : (
          <Empty />
          )}
    </div>
  )
}

export default Cart
