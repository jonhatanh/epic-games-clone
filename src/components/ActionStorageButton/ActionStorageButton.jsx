import PropTypes from 'prop-types'
import Button from '../Button/Button'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { StorageContext } from '@/hooks/useGamesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastCheckOutForm } from '../../views/Cart/Cart'

const ActionStorageButton = ({
  storageName,
  gameId,
  extraActions = null,
  icon = null,
  children,
  ...extraProps
}) => {
  const { addGame, removeGame, gameInStorage, buySingleGame } =
    useContext(StorageContext)
  const gameInLibrary = gameInStorage(gameId, 'library')
  const gameStored = gameInStorage(gameId, storageName)
  let buttonText = gameStored
    ? `Remove from ${storageName}`
    : `Add to ${storageName}`

  if (storageName !== 'library' && gameInLibrary) return null
  if (storageName === 'library') {
    buttonText = gameStored ? 'Go to library' : 'Buy now'
  }

  function handlePurchase () {
    buySingleGame(gameId)
    toast.success('Game added to your library!')
  }

  function handleClick () {
    extraActions && extraActions()
    if (gameStored) {
      if (storageName === 'library') return
      removeGame(gameId, storageName)
      toast.error(`Game removed from ${storageName}`)
    } else {
      if (storageName === 'library') {
        toast(ToastCheckOutForm, {
          id: 'checkout',
          duration: Infinity,
          onConfirm: () => handlePurchase()
        })
        return
      }
      addGame(gameId, storageName)
      toast.success(`Game added to ${storageName}`)
    }
  }
  return (
    <Button onClick={handleClick} {...extraProps}>
      {icon && (
        <FontAwesomeIcon icon={gameStored ? icon.negative : icon.positive} />
      )}
      {buttonText}

      {children}
    </Button>
  )
}

ActionStorageButton.propTypes = {
  storageName: PropTypes.oneOf(['cart', 'library', 'wishlist']).isRequired,
  gameId: PropTypes.number.isRequired,
  extraActions: PropTypes.func,
  icon: PropTypes.shape({
    positive: PropTypes.any,
    negative: PropTypes.any
  }),
  autoText: PropTypes.bool,
  removeDefaultClick: PropTypes.bool,
  children: PropTypes.any
}

export default ActionStorageButton
