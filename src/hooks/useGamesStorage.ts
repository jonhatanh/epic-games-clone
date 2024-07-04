import { createContext, useEffect, useState } from 'react'


type StorageType = {
  cart: number[]
  wishlist: number[]
  library: number[]
}
type StorageName = keyof StorageType

type StorageContextType = {
  idsStorage: StorageType;
  addGame: (gameId: number, category: StorageName) => void;
  removeGame: (gameId: number, category: StorageName, allGames?: boolean) => void;
  gameInStorage: (gameId: number, category: StorageName) => boolean;
  buyGamesInCart: () => void;
  buySingleGame: (gameId: number) => void;
}

export const StorageContext = createContext<StorageContextType>({
  idsStorage: {
    cart: [],
    wishlist: [],
    library: []
  },
  addGame: () => { },
  removeGame: () => { },
  gameInStorage: () => false,
  buyGamesInCart: () => { },
  buySingleGame: () => { }
})

export function useGamesStorage () {
  const [idsStorage, setIdsStorage] = useState<StorageType>(() => {
    const storage = localStorage.getItem('idsStorage')
    return storage
      ? JSON.parse(storage)
      : {
          cart: [],
          wishlist: [],
          library: []
        }
  })
  function addGame (gameId: number, category: StorageName) {
    if (idsStorage[category].includes(gameId)) return
    const newCategory = [...idsStorage[category], gameId]
    setIdsStorage((latestStorage) => ({
      ...latestStorage,
      [category]: newCategory
    }))
  }
  function removeGame (gameId: number, category: StorageName, allGames = false) {
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
  function gameInStorage (gameId: number, category: StorageName) {
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
  function buySingleGame (gameId: number) {
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
