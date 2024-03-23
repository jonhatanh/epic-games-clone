import { createContext, useEffect, useState } from 'react'

export const StorageContext = createContext({
  cart: [],
  wishlist: [],
  library: []
})

export function useGamesStorage () {
  const [idsStorage, setIdsStorage] = useState(() => {
    const storage = localStorage.getItem('idsStorage')
    return storage
      ? JSON.parse(storage)
      : {
          cart: [],
          wishlist: [],
          library: []
        }
  })
  function addGame (gameId, category) {
    if (idsStorage[category].includes(gameId)) return
    const newCategory = [...idsStorage[category], gameId]
    setIdsStorage((latestStorage) => ({
      ...latestStorage,
      [category]: newCategory
    }))
  }
  function removeGame (gameId, category, allGames = false) {
    if (allGames) {
      setIdsStorage((latestStorage) => ({
        ...latestStorage,
        [category]: []
      }))
      return
    }
    const newCategory = idsStorage[category].filter((id) => id !== gameId)
    setIdsStorage((latestStorage) => ({
      ...latestStorage,
      [category]: newCategory
    }))
  }
  function gameInStorage (gameId, category) {
    return idsStorage[category].includes(gameId)
  }
  function buyGamesInCart () {
    const newWishlist = idsStorage.wishlist.filter(
      (gameId) => !idsStorage.cart.includes(gameId)
    )
    setIdsStorage((latestStorage) => ({
      wishlist: newWishlist,
      cart: [],
      library: [...latestStorage.library, ...latestStorage.cart]
    }))
  }
  function buySingleGame (gameId) {
    const newWishlist = idsStorage.wishlist.filter((id) => id !== gameId)
    const newCart = idsStorage.cart.filter((id) => id !== gameId)
    setIdsStorage((latestStorage) => ({
      ...latestStorage,
      wishlist: newWishlist,
      cart: newCart,
      library: [...latestStorage.library, gameId]
    }))
  }

  useEffect(() => {
    localStorage.setItem('idsStorage', JSON.stringify(idsStorage))
  }, [idsStorage])
  return {
    idsStorage,
    addGame,
    removeGame,
    gameInStorage,
    buyGamesInCart,
    buySingleGame
  }
}
