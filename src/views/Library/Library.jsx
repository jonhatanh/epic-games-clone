import { useLoaderData } from 'react-router-dom'
import classes from './Library.module.css'
import { useContext } from 'react'
import { StorageContext } from '../../App'
import GameCartCard from '../../components/GameCartCard/GameCartCard'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'
import Empty from '../../components/Empty/Empty'
import GamesCatalogue from '../Store/views/Browse/GamesCatalogue/GamesCatalogue'
const Library = () => {
  const { games } = useLoaderData()
  const { addGame, removeGame, gameInStorage, idsStorage } =
    useContext(StorageContext)

  return (
    <div className={classes.container}>
      <h2>
        Library <span>({idsStorage.library.length})</span>
      </h2>
      {idsStorage.library?.length > 0
        ? (
          <div className={classes.library}>
            <GamesCatalogue games={games} showPrice={false}> </GamesCatalogue>
          </div>
          )
        : (
          <Empty />
          )}
    </div>
  )
}

export default Library
