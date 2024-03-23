import { useLoaderData } from 'react-router-dom'
import classes from './Library.module.css'
import { useContext } from 'react'
import { StorageContext } from '@/hooks/useGamesStorage'
import Button from '@/components/Button/Button'
import toast from 'react-hot-toast'
import Empty from '@/components/Empty/Empty'
import GamesCatalogue from '../Store/views/Browse/GamesCatalogue/GamesCatalogue'
const Library = () => {
  const { games } = useLoaderData()
  const { removeGame, idsStorage } = useContext(StorageContext)

  function handleClick () {
    removeGame(0, 'library', true)
    toast.success('Your library was deleted. Good thing it was free...')
  }
  return (
    <div className={classes.container}>
      <header>
        <h2>
          Library <span>({idsStorage.library.length})</span>
        </h2>
        {idsStorage.library.length > 0 && (
          <Button bgColor='gray' onClick={handleClick}>
            Clear library
          </Button>
        )}
      </header>
      {idsStorage.library?.length > 0
        ? (
          <div className={classes.library}>
            <GamesCatalogue games={games} showPrice={false}>
              {' '}
            </GamesCatalogue>
          </div>
          )
        : (
          <Empty />
          )}
    </div>
  )
}

export default Library
