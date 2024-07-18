import Button, { ButtonType } from '../Button/Button'
import toast, { ToastOptions } from 'react-hot-toast'
import { useContext } from 'react'
import { StorageContext, StorageName } from '@/hooks/useGamesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastCheckOutForm } from '../../views/Cart/Cart'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type ActionStorageProps = {
  storageName: StorageName
  gameId: number
  extraActions?: (() => void)
  icon?: { positive: IconDefinition; negative: IconDefinition }
  autoText?: boolean
  removeDefaultClick?: boolean
  children?: React.ReactNode
}

const ActionStorageButton = ({
  storageName,
  gameId,
  extraActions,
  icon,
  children = null,
  ...extraProps
}: ActionStorageProps & ButtonType) => {
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
        } as ToastOptions)
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


export default ActionStorageButton
