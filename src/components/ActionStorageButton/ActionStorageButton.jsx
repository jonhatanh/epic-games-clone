import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { StorageContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ActionStorageButton = ({
  storageName,
  gameId,
  extraActions = null,
  autoText = false,
  icon = null,
  children,
  removeDefaultClick = false,
  ...extraProps
}) => {
  const { addGame, removeGame, gameInStorage } = useContext(StorageContext)
  const gameStored = gameInStorage(gameId, storageName)
  const buttonText = autoText
    ? gameStored
      ? `Remove from ${storageName}`
      : `Add to ${storageName}`
    : ''

  console.log(buttonText, gameStored)
  function handleClick () {
    extraActions && extraActions()
    if (removeDefaultClick) return
    if (gameStored) {
      removeGame(gameId, storageName)
      toast.error(`Game removed from ${storageName}`)
    } else {
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
  storageName: PropTypes.oneOf(['card', 'library', 'wishlist']).isRequired,
  gameId: PropTypes.number.isRequired,
  extraActions: PropTypes.func,
  icon: PropTypes.shape({
    positive: PropTypes.any,
    negative: PropTypes.any
  }),
  autoText: PropTypes.bool,
  removeDefaultClick: PropTypes.bool,
  children: PropTypes.element
}

export default ActionStorageButton
